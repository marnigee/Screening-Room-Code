/**
* Global variables
*	
* 
**/	

var debug = true;

//Brightcove vars (global to manage Brightcove API implementation issue)
var player;
var modVP;
var modExp;
var modCon;
var social;

$(document).ready(function() {	

	/**
	* Package of Video Objects
	*	
	* 
	**/	

	//Video object representing a single video
	function Video(id,name,shortDescription,linkURL, thumbnailURL)
	{
		this.id = id;
		this.name = name;
		this.shortDescription = shortDescription;
		this.linkURL = linkURL;
		this.thumbnailURL = thumbnailURL;
	}


	//PageOfVideos object representing a single screen of video results
	function PageOfVideos(next_page, video_array)
	{
		this.next_page = next_page;
		this.video_array = video_array;
	}


	//VideoGroup object representing a single collection of videos that has array of PageOfVideos objects, usually also a menu item
	function VideoGroup(json_call, menu_text, heading, subhead, next_page, search_term)
	{
		this.json_call = json_call;
		this.menu_text = menu_text;
		this.heading = heading;
		this.subhead = subhead;
		this.next_page = next_page;
		this.search_term = search_term;
	
		//set default
		if (typeof next_page == 'undefined')
			this.next_page = "before_first_page";
		
		this.page_of_videos_array = new Array();

		//handle logic for adding another PageOfVideos object to Array--ensure there are no duplicates
		this.addAnotherPageOfVideos = function addAnotherPageOfVideos (the_videos, the_next_page) {
			var already_in_array = false;
			for (x = 0; x < this.page_of_videos_array.length; x++) {
				if (this.page_of_videos_array[x].next_page == the_next_page) {
					already_in_array = true;
					break;			
				}
			}
			if (!already_in_array) {
				var new_video_page = new PageOfVideos(the_next_page, the_videos);
				this.page_of_videos_array.push(new_video_page);
			}
		}
	}	
	
	
	/**
	* VideoController object is the major controller and contains
	* the business logic for for how VideoGroups behave
	* 
	* 
	**/	
	function VideoController() {
		//for autocomplete search box
		this.names_autocomplete = new Array();
		
		//for layout
		this.DEFAULT_PAGE_SIZE = 15;
		this.DEFAULT_HOME_PAGE_COLUMN_SIZE = 3;

		//for search
		this.SEARCH_TOKEN = "SEARCH_TOKEN";
		this.SEARCH_PAGE_NUMBER_TOKEN = "SEARCH_PAGE_NUMBER_TOKEN";

		//for featured video
		this.feature_video_id;
		this.feature_video_name;
		this.feature_video_desc;
		this.feature_video_url;
	}

	/**
	* handle converting incoming AJAX results into appropriate Video objects--
	* the main engine of the app
	**/	
	VideoController.prototype.populateVideoGroupObjectWithVideos = function (response, textStatus, jqXHR) {
		//if this VideoGroup object doesn't exist yet, build a new one
		if (typeof jqXHR.video_group_index == 'undefined') {
			if (debug) {
				console.log("jqXHR.is_landing_page: " + jqXHR.is_landing_page);
				console.log("jqXHR.is_search: " + jqXHR.is_search);
			}
			buildVideoGroupArrays(jqXHR.is_landing_page);
		}
		//if this VideoGroup object DOES exist
		else {
			var the_video_group = videoController.video_groups[jqXHR.video_group_index];
		
			//set the appropriate next_page vaule
			if (videoController instanceof BrightcoveVideoController) 
				this_next_page = parseInt(response.bc.page_number) + 1;
			else if (videoController instanceof YouTubeVideoController)
				this_next_page = response.nextPageToken;

			//if this is a result of a search, set the appropriate search_term vaule
			if (jqXHR.is_search)
				the_video_group.search_term = jqXHR.search_text;
		
			//build a new array of Video objects
			var new_video_array = new Array();
		
			$.each(response.items, function (i, item) {
				var this_video;
				if (videoController instanceof BrightcoveVideoController)
					this_video = new Video(item.id, item.name, item.shortDescription, item.linkURL, item.thumbnailURL);
				else if (videoController instanceof YouTubeVideoController)
					this_video = new Video(item.id.videoId, videoController.truncate(item.snippet.title, 50), videoController.truncate(item.snippet.description, 30), "" + this.YOUTUBE_PLAY_URL + item.id.videoId, item.snippet.thumbnails.medium.url);
		
				//add names to autocomplete array
				videoController.names_autocomplete.push(this_video.name);
			
				//add the video to the new array of Video objects
				new_video_array.push(this_video); 
			});

			//add a new PageOfVideos object to the VideoGroup object
			the_video_group.addAnotherPageOfVideos(new_video_array, this_next_page);

			//layout the appropriate PageOfVideos object 
			if (jqXHR.layout_videos)
				videoController.layoutVideos(jqXHR.is_landing_page, jqXHR.video_group_index, jqXHR.the_search_page_number, jqXHR.is_search);
		}
	}

	/**
	* handle search clicks: if VideoGroup object exists, lay it out and if it 
	* doesn't exist, create a new VideoGroup and then lay out appropriate video array
	**/	
	VideoController.prototype.handleSearchClick = function handleSearchClick (event, ui, the_ajax_url){
		if (debug)
			console.log("in parent VideoController object");
		search_text = $( "#autocomplete" ).val();
		var searchTermObjectPosition = this.searchTermObjectExists(search_text);
		
		//if search VideoGroup object does NOT exist, make new VideoGroup object and lay out appropriate Video array
		if (searchTermObjectPosition == -1) {
			//make new VideoGroup object
			if (debug)
				console.log("search VideoGroup DOES NOT exist as object");
			this.video_groups.push(new VideoGroup(the_ajax_url,"", "Search Results for: " + search_text, "", "", search_text));
			the_video_group_index = this.video_groups.length - 1;
			this.AddVideoGroupToArray(search_text, the_video_group_index);
		}
		//if search VideoGroup object already exists, lay out appropriate Video array
		else {
			var layout_videos = true;
			var is_landing_page = false;
			var is_search = true;
			this.layoutVideos(is_landing_page, searchTermObjectPosition,  0);
		}
	}
	
	/**
	* handle more clicks: if VideoGroup object exists, lay it out and if it
	* doesn't exist, create a new VideoGroup and then lay out appropriate video array
	**/	
	VideoController.prototype.handleMoreClick  = function handleMoreClick (event, ui, the_json_datatype){
		//gets the VideoGroup array index and PageOfVideos array index from preset HTML values
		var the_video_group_index = $(event.target).closest("a").attr("class");
		var the_search_page_number = $(event.target).closest("a").attr("id");
		
		//since this is from a more click, set layout to true
		var layout_videos = true;
		
		//since this is from a more click, set landing page to false
		var is_landing_page = false;
		
		//if this is from a more search, initialize search term in VideoGroup object
		var is_search = typeof videoController.video_groups[the_video_group_index].search_term == 'undefined' ? false : true;
		
		//if that PageOfVideos array is already in VideoGroup, lay out the appropriate video array
		if (the_search_page_number <= this.video_groups[the_video_group_index].page_of_videos_array.length - 1) {
			if (debug)
				console.log("exists as object");
			this.layoutVideos(is_landing_page, the_video_group_index,  the_search_page_number );
		} 
		//if that PageOfVideos array is NOT already in the array, do ajax call to get the appropriate video array
		else {	
			if (debug)
				console.log("does NOT exist as object--doing ajax");
			
			//get the next page token for the ajax call
			var the_next_page_token = this.video_groups[the_video_group_index].page_of_videos_array[parseInt(the_search_page_number) - 1].next_page;
			
			//build the AJAX call appropriately
			var the_ajax_url;
			if (is_search){
				the_ajax_url = this.getSearchAjaxURL(search_text, the_video_group_index, this.DEFAULT_PAGE_SIZE, the_next_page_token);
			}
			else {
				the_ajax_url = this.getAjaxURL(the_video_group_index,the_next_page_token,this.DEFAULT_PAGE_SIZE);
			}	
			
			//do the ajax call			
			$.ajax({
				type: "POST",
				//set jsponp dataType value for YouTube API
				dataType: the_json_datatype,
				contentType: "application/json",
				//store appropriate data in XHR object to pass to populateVideoGroupObjectWithVideos function
				beforeSend  : function(XHR) {
					XHR.video_group_index = the_video_group_index;
					XHR.layout_videos = layout_videos;
					XHR.is_landing_page = is_landing_page;
					XHR.the_ajax_url = the_ajax_url;
					XHR.the_search_page_number = the_search_page_number;
					XHR.is_search = is_search;
					XHR.search_text = videoController.video_groups[the_video_group_index].search_term
				},
				url: the_ajax_url,
				
				//upon successful ajax return, pass to populateVideoGroupObjectWithVideos function with XHR object
				success: this.populateVideoGroupObjectWithVideos, 
				
				//if error, display error message
				error: function(jqXHR, error, errorThrown) { 
					scrollToPlayer();
					$('#error_message').html("<p>Sorry, but you've encountered a hiccup. Please try again.</p>");
				}
			
			}); 
		}
	}		
		
	/**
	* handle the left nav menu clicks
	**/	
	VideoController.prototype.handleMenuClick = function (event, ui) {
			var the_video_group_index;
			$.each(ui, function (i, item) {
			   the_video_group_index = item.find(".get_video_group").attr("id");
			});
			var layout_videos = true;
			var is_landing_page = false;
			this.layoutVideos(is_landing_page, the_video_group_index, 0);
	}
	
	/**
	* handle the play video clicks
	**/	
	VideoController.prototype.handlePlayVideoClick = function (event) {
		var the_video_id = $(event.target).closest("li").attr("id");
		var the_search_page_number = $(event.target).closest("li").attr("class");
		
		if (debug) {
			console.log("in parent handlePlayVideoClick()");
			console.log("the_video_id: " + the_video_id);
			console.log("the_search_page_number: " + the_search_page_number);
		}
		
		var video_found = false; 

		for (x = 0;x < videoController.video_groups.length; x++) {
			if (typeof videoController.video_groups[x].page_of_videos_array[the_search_page_number] != 'undefined') {
				$.each(videoController.video_groups[x].page_of_videos_array[the_search_page_number].video_array, function (i, item) {
					var this_video = videoController.video_groups[x].page_of_videos_array[the_search_page_number].video_array[i];
					if (this_video.id == the_video_id) {
						videoController.playTitle(this_video.id, this_video.name, this_video.shortDescription, this_video.linkURL);
						video_found = true;
					}	
				});	
				if (video_found) {
					break;
				}
			}
		}	
	}
	
	/**
	* handle laying out the PageOfVideo object
	**/	
	VideoController.prototype.layoutVideos = function (is_landing_page, video_group_index, this_search_page_number, is_search) {
		//determine which column is being laid out
		var li_counter = 1;
		var more_column = this.DEFAULT_HOME_PAGE_COLUMN_SIZE;
	
		//if it's the landing page, prepare to lay out the first 3 VideoGroup objects
		if (is_landing_page) {
			if (video_group_index == 0) {
				li_counter = 1;
				more_column = 1;
			}
			else if (video_group_index == 1) {
				li_counter = 6;
				more_column = 2;
			}
			else if (video_group_index == 2) {
				li_counter = 11;
				more_column = 3;
			}
		}
	
		//get the appropriate array of Video objects
		var the_video_array = videoController.video_groups[video_group_index].page_of_videos_array[this_search_page_number].video_array;

		//if it's the landing page, lay out the first 3 VideoGroup objects
		if (is_landing_page) {
			for (i = 0; i < (this.DEFAULT_PAGE_SIZE/this.DEFAULT_HOME_PAGE_COLUMN_SIZE); i++) {
				if (typeof the_video_array[i] != 'undefined') {
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ')').attr("id", the_video_array[i].id);
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ')').attr("class", this_search_page_number);
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ') img').attr("src", the_video_array[i].thumbnailURL);
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ') #title_isolated').html(the_video_array[i].name);
					if (videoController instanceof BrightcoveVideoController)
						$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ') #desc_isolated').html(the_video_array[i].shortDescription);
				
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ')').show();
					li_counter++;
				} 
				else {
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ')').hide();
					li_counter++;
				}
			}
		
		}
		/* if it's NOT the landing page, lay out the first VideoGroup object and set the VideoGroup array index
		and PageOfVideos array index into id and class HTML attributes */
		else {
			li_counter = 1;
			for (i = 0; i < this.DEFAULT_PAGE_SIZE; i++) {
				if (typeof the_video_array[i] != 'undefined') {
					//set the VideoGroup array index into HTML values
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ')').attr("id", the_video_array[i].id);
					//sets the PageOfVideos array index into HTML values
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ')').attr("class", this_search_page_number);
				
					//lay out the appropriate Video fields 
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ') img').attr("src", the_video_array[i].thumbnailURL);
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ') #title_isolated').html(the_video_array[i].name);
					if (videoController instanceof BrightcoveVideoController)
						$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ') #desc_isolated').html(the_video_array[i].shortDescription);
				
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ')').show();

					li_counter++;
				}
				else {
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ')').hide();
					li_counter++;
				}
			}
		}
	
		//as long as this is not the last page of results, display more
		$('#more_link_' + more_column + ' a').attr("class", video_group_index);
		if (is_landing_page)
			$('#more_link_' + more_column + ' a').attr("id", this_search_page_number);
		else
			$('#more_link_' + more_column + ' a').attr("id", parseInt(1) + parseInt(this_search_page_number));
		$('#more_link_' + more_column + ' a').html("See more >").show();
	
		//if it's NOT the landing page, hide more links for the first 2 columns
		if (!is_landing_page) {
			$('#more_link_1 a').hide();
			$('#more_link_2 a').hide();
		}	
	
		//don't show more link if last results page
		if ((the_video_array.length < this.DEFAULT_PAGE_SIZE))
			$('#more_link_3 a').hide();
		
		//if it's a landing page, set the feature video
		if (is_landing_page) 
			this.setFeatureVideoAndHeadings (true, video_group_index, this_search_page_number);
		//if it's NOT a landing page, only set the headings and NOT the feature video
		else 
			this.setFeatureVideoAndHeadings (false, video_group_index, this_search_page_number);
		
	}

	/**
	* display the left nav menus
	**/	
	VideoController.prototype.setMenu = function (event, ui) {
		$(function() {
			$.each( videoController.video_groups, function( index, value ) {
				if (videoController.video_groups[index].menu_text.length > 0)
					$("#menu").append("<li id='sr-menu'><a style='z-index:10000;' class='get_video_group' id = " + index + " href=''>" + videoController.video_groups[index].menu_text + "</a></li>");
			});
			$( "#menu" ).menu();
		});		
	}

	/**
	* determine if search_term exists to avoid remaking VideoGroup objects that already exist
	**/	
	VideoController.prototype.searchTermObjectExists = function (the_search_term) {
		var position = -1;
		for (x = 0; x < this.video_groups.length; x++) {

		   if (this.video_groups[x].search_term == the_search_term) 
			   position = x;
		}
		return position;
	}

	/**
	* display the left nav menus
	**/	
	VideoController.prototype.setMenu = function (event, ui) {
		$(function() {
			$.each( videoController.video_groups, function( index, value ) {
				if (videoController.video_groups[index].menu_text.length > 0)
					$("#menu").append("<li id='sr-menu'><a style='z-index:10000;' class='get_video_group' id = " + index + " href=''>" + videoController.video_groups[index].menu_text + "</a></li>");
			});
			$( "#menu" ).menu();
		});		
	}
	
	/**
	* add a new VideoGroup to the array as a result of a search request and then lay out new Video array
	**/	
	VideoController.prototype.AddVideoGroupToArray = function AddVideoGroupToArray(the_search_text, the_video_group_index, the_json_datatype) { 
		var layout_videos = true;
		var the_ajax_url = this.getSearchAjaxURL(the_search_text, the_video_group_index, this.DEFAULT_PAGE_SIZE);
		if (debug) {
			console.log("this.DEFAULT_PAGE_SIZE: " + this.DEFAULT_PAGE_SIZE);
			console.log("VideoController.DEFAULT_PAGE_SIZE: " + VideoController.DEFAULT_PAGE_SIZE);
			console.log("the_ajax_url: " + the_ajax_url);

		}

		$.ajax({
			type: "POST",
			dataType: the_json_datatype,
			contentType: "application/json",
			url: the_ajax_url,
			beforeSend : function(XHR) {
				XHR.video_group_index = the_video_group_index;
				XHR.layout_videos = layout_videos;
				XHR.is_landing_page = false;
				XHR.the_search_page_number = 0; 
				XHR.is_search = true; 
				XHR.search_text = the_search_text; 
		   },
			success : this.populateVideoGroupObjectWithVideos,
			error: function(jqXHR, error, errorThrown) { 
				scrollToPlayer();
				$('#error_message').html("<p>Sorry, but you've encountered a hiccup. Please try again.</p>");
			}
			
		}); 				
	}
	
	/**
	* make AJAX calls for all the VideoGroup objects in the array and then lay out the
	* appropriate first 3 Video arrays (gets called to build VideoGroups for landing page) 
	**/	
	VideoController.prototype.buildVideoGroupArrays = function buildVideoGroupArrays(is_landing_page, the_json_datatype) { 
		//set default to false
		var layout_videos = false;
		
		//set last column to 0-based index of VideoGroup array
		var last_col = this.DEFAULT_HOME_PAGE_COLUMN_SIZE - 1;
		
		for (c = 0; c < this.video_groups.length; c++) {
			//if last column on page, layout appropriate videos (first group or first 3 groups)
			if (c <= last_col) 
				layout_videos = true;
			//if beyond landing page content, suppress layout
			else if (c > last_col)
				layout_videos = false;
				
			//build appropriate AJAX url
			var the_ajax_url = this.getAjaxURL(c,0,this.DEFAULT_PAGE_SIZE);
			if (debug) {
				console.log("VideoController.DEFAULT_PAGE_SIZE: " + VideoController.DEFAULT_PAGE_SIZE);
				console.log("this.DEFAULT_PAGE_SIZE: " + this.DEFAULT_PAGE_SIZE);
				//console.log("DEFAULT_PAGE_SIZE: " + DEFAULT_PAGE_SIZE);
				console.log("the_ajax_url: " + the_ajax_url);

			}
			$.ajax({
				type: "POST",
				//set jsponp dataType value for YouTube API
				dataType: the_json_datatype,
				contentType: "application/json",
				url: the_ajax_url,
				//store appropriate data in XHR object to pass to populateVideoGroupObjectWithVideos function
				beforeSend : function(XHR) {
					XHR.video_group_index = c;
					XHR.layout_videos = layout_videos;
					XHR.is_landing_page = is_landing_page;
					XHR.the_search_page_number = 0; 
				},

				//upon successful ajax return, pass to populateVideoGroupObjectWithVideos function with XHR object
				success: this.populateVideoGroupObjectWithVideos,

				//if error, display error message
				error: function(jqXHR, error, errorThrown) { 
					scrollToPlayer();
					$('#error_message').html("<p>Sorry, but you've encountered a hiccup. Please try again.</p>");
				}
			}); 				
		}
	}
	
	/**
	* shorten long video titles and descriptions
	**/	
	VideoController.prototype.truncate = function truncate(text, length, ellipsis) {
		// Set length and ellipsis to defaults if not defined
		if (typeof length == 'undefined') var length = 100;
		if (typeof ellipsis == 'undefined') var ellipsis = '...';
 
		// Return if the text is already lower than the cutoff
		if (text.length < length) return text;
 
		// Otherwise, check if the last character is a space.
		// If not, keep counting down from the last character
		// until we find a character that is a space
		for (var i = length-1; text.charAt(i) != ' '; i--) {
			length--;
		}
 
		// The for() loop ends when it finds a space, and the length var
		// has been updated so it doesn't cut in the middle of a word.
		return text.substr(0, length-1) + ellipsis;
	}
	
	/**
	* helper method to get URL parameter
	**/	
	VideoController.prototype.getURLParameter = function getURLParameter(name) {
		return decodeURI(
			(RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
		);
	}	
	


	/**
	* YouTubeVideoController object object inherits from VideoController object
	* and contains the business logic for for how YouTube VideoGroups behave
	* 
	* 
	**/	
	function YouTubeVideoController() { 
	
		this.YOUTUBE_PLAY_URL = "http://youtu.be/";
		this.YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&channelId=UC4-hGd01KPF1i9xSWtox0JQ&maxResults=" + this.DEFAULT_PAGE_SIZE + "&q=" + this.SEARCH_TOKEN + "&key=AIzaSyDien4wrgW5R-Ewzq2hRxvoofMgTLVlFO8&alt=json";

		/**
		* initialize the preloaded YouTube VideoGroups
		**/	
    	this.video_groups = [
			new VideoGroup("https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&channelId=UC4-hGd01KPF1i9xSWtox0JQ&maxResults=" + this.DEFAULT_PAGE_SIZE + "&q=mad%20men&key=AIzaSyDien4wrgW5R-Ewzq2hRxvoofMgTLVlFO8&alt=json","Mad Men", "Mad Men", "Jon Hamm Highlights"),
			new VideoGroup("https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&channelId=UC4-hGd01KPF1i9xSWtox0JQ&maxResults=" + this.DEFAULT_PAGE_SIZE + "&q=community&key=AIzaSyDien4wrgW5R-Ewzq2hRxvoofMgTLVlFO8&alt=json","Community", "Community", "Community Highlights"), 
			new VideoGroup("https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&channelId=UC4-hGd01KPF1i9xSWtox0JQ&maxResults=" + this.DEFAULT_PAGE_SIZE + "&q=paleyfest&key=AIzaSyDien4wrgW5R-Ewzq2hRxvoofMgTLVlFO8&alt=json","PaleyFest", "PaleyFest", "PaleyFest Highlights"), 
		];	
		
		/**
		* handle laying out the YouTube feature video and headings
		**/	
		this.setFeatureVideoAndHeadings = function (is_landing_page, video_group_index, this_search_page_number){ 
			var this_video = this.video_groups[video_group_index].page_of_videos_array[this_search_page_number].video_array[0];

			//if it's a landing page, lay out the feature video
			if (is_landing_page) {
				//set embedded youtube player with appropriate video ID
				$( "#ytplayer" ).attr("src", "https://www.youtube.com/embed/" + this_video.id);
				//set featured video in info box
				VideoController.feature_video_id = this_video.id;
				VideoController.feature_video_name = this_video.name;
				VideoController.feature_video_desc = this_video.shortDescription;
				VideoController.feature_video_url = this_video.linkURL;
				doInfoBox(VideoController.feature_video_name, VideoController.feature_video_desc,  VideoController.feature_video_url, false, VideoController.feature_video_id);	
			}
				
			//if it's a landing page, lay out 3 column headings
			if (is_landing_page) {
				//set column headings and subheads
				$('#head_col_1').html(this.video_groups[0].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + this.video_groups[0].subhead).show();
				$('#head_col_2').html(this.video_groups[1].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + this.video_groups[1].subhead).show();
				$('#head_col_3').html(this.video_groups[2].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + this.video_groups[2].subhead).show();
			} 
			//if it's NOT a landing page, lay out column headings and hides the other 2
			else {
				//set column headings and subheads
				$('#head_col_1').html(this.video_groups[video_group_index].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + this.video_groups[video_group_index].subhead).show();
				$('#head_col_2').hide();
				$('#head_col_3').hide();

			}
		}

		/**
		* display YouTube video player
		**/	
		this.buildPlayer = function buildPlayer() {
			
			//var append_string = '<iframe style="display:hidden;position:relative;left:188px;top:131px;" id="ytplayer" type="text/html" width="493" height="307" src="https://www.youtube.com/embed/' + videoId + ' frameborder="0" allowfullscreen=""></iframe>';
			var append_string = '<iframe style="position:relative;left:188px;top:131px;" id="ytplayer" type="text/html" width="493" height="307" src="https://www.youtube.com/embed/' + this.feature_video_id + ' frameborder="0" allowfullscreen=""></iframe>';
			$( "#video_player" ).html(append_string);
			
			$( "#video_player" ).css("display","block");
				
			
		
			//$( "#ytplayer" ).show();
		 }
		 
		/**
		* set info box for featured video and play video (called on play clicks)
		**/	
		this.playTitle = function playTitle(videoId, name, desc, link) {
			doInfoBox(name, desc, link, true, videoId);
			$( "#ytplayer" ).attr("src", "https://www.youtube.com/embed/" + videoId + "?autoplay=1");
		} 
		
		/**
		* helper method to build AJAX URL from menu or more request
		**/	
		this.getAjaxURL = function getAjaxURL(the_video_group_index, new_page_number, page_size) {
			var the_page_size = (page_size != VideoController.DEFAULT_PAGE_SIZE) ? page_size : VideoController.DEFAULT_PAGE_SIZE;
			var ajax_url = videoController.video_groups[the_video_group_index].json_call.replace(VideoController.DEFAULT_PAGE_SIZE, the_page_size);
			if (new_page_number != 0) 
				ajax_url += "&pageToken=" + new_page_number;		
			return ajax_url;
		}
	
		/**
		* helper method to build AJAX URL from search request
		**/	
		this.getSearchAjaxURL = function getSearchAjaxURL(the_search_term, the_group_index, the_default_page_size, the_search_page_number) {
			var new_search_url;
			new_search_url = videoController.video_groups[the_group_index].json_call.replace(this.SEARCH_TOKEN, the_search_term);
			new_search_url = new_search_url.replace(VideoController.DEFAULT_PAGE_SIZE, the_default_page_size);

			if (typeof the_search_page_number != 'undefined') {
				if (the_search_page_number != 0) 
					new_search_url += "&pageToken=" + the_search_page_number;
			}
		
			return new_search_url;
		}	
	}
	

	/**
	* BrightcoveVideoController object inherits from VideoController object 
	* and contains the business logic for for how Brightcove VideoGroups behave
	* 
	* 
	**/	
	function BrightcoveVideoController() { 
	
		this.BRIGHTCOVE_SEARCH_URL = "http://media.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=" + this.DEFAULT_PAGE_SIZE + "&page_number=" + this.SEARCH_PAGE_NUMBER_TOKEN + "&all=tag:screening%20room&all=search_text:" + this.SEARCH_TOKEN + "&callback=video";

		/**
		* initialize the preloaded Brightcove VideoGroups
		**/	
		this.video_groups = [
			new VideoGroup("http://media.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=" + VideoController.DEFAULT_PAGE_SIZE + "&page_number=0&all=tag:popular&all=tag:screening%20room&sort_by=PLAYS_TOTAL:DESC&callback=video","", "Popular", "Most Watched on paleycenter.org"),
			new VideoGroup("http://media.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=" + VideoController.DEFAULT_PAGE_SIZE + "&page_number=0&none=tag:paleyfest&all=tag:screening%20room&sort_by=CREATION_DATE:DESC&callback=video","", "Recently Added", "Videos Added Every Week"), 
			new VideoGroup("http://media.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=" + VideoController.DEFAULT_PAGE_SIZE + "&page_number=0&all=tag:paleyfest&all=tag:screening%20room&callback=video","PaleyFest", "PaleyFest", "See Your Favorite Shows & Stars"), 
			new VideoGroup("http://media.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=" + VideoController.DEFAULT_PAGE_SIZE + "&page_number=0&all=tag:comedy&all=tag:screening%20room&callback=video","Comedy", "Comedy", "Comedy Events"), 
			new VideoGroup("http://media.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=" + VideoController.DEFAULT_PAGE_SIZE + "&page_number=0&all=tag:drama&all=tag:screening%20room&callback=video","Drama", "Drama", "Drama Events"), 
			new VideoGroup("http://media.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=" + VideoController.DEFAULT_PAGE_SIZE + "&page_number=0&all=tag:music&all=tag:screening%20room&callback=video","Music", "Music", "Music Events"), 
			new VideoGroup("http://media.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=" + VideoController.DEFAULT_PAGE_SIZE + "&page_number=0&all=tag:issues&all=tag:screening%20room&callback=video","Issues", "Issues", "Issues Events"), 
			new VideoGroup("http://media.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=" + VideoController.DEFAULT_PAGE_SIZE + "&page_number=0&all=tag:scifi&all=tag:screening%20room&callback=video","SciFi", "SciFi", "SciFi Events"), 
			new VideoGroup("http://media.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=" + VideoController.DEFAULT_PAGE_SIZE + "&page_number=0&all=tag:paleydocevents&all=tag:screening%20room&callback=video","PaleyDocScene", "PaleyDocScene", "Documentary Events"), 
			new VideoGroup("http://media.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=" + VideoController.DEFAULT_PAGE_SIZE + "&page_number=0&all=tag:paleyfest&all=tag:screening%20room&callback=video","PaleyFest", "PaleyFest", "See Your Favorite Shows & Stars"), 
			new VideoGroup("http://media.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=" + VideoController.DEFAULT_PAGE_SIZE + "&page_number=0&all=tag:paleyafterdark&all=tag:screening%20room&callback=video","PaleyAfterDark/Paley100", "PaleyAfterDark/Paley100", "Patron Membership Events"), 
			new VideoGroup("http://media.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=" + VideoController.DEFAULT_PAGE_SIZE + "&page_number=0&all=tag:womenatpaley&all=tag:screening%20room&callback=video","Women@Paley", "Women@Paley", "Accomplished women share their talents and insight"), 
			new VideoGroup("http://media.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=" + VideoController.DEFAULT_PAGE_SIZE + "&page_number=0&all=tag:season%201&all=tag:At%20the%20Paley%20Center&all=tag:screening%20room&callback=video","At the Paley Center Season 1", "At the Paley Center Season 1", "Paley Center TV Series"),
			new VideoGroup("http://media.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=" + VideoController.DEFAULT_PAGE_SIZE + "&page_number=0&all=tag:season%202&all=tag:At%20the%20Paley%20Center&all=tag:screening%20room&callback=video","At the Paley Center Season 2", "At the Paley Center Season 2", "She's Making Media Events for the Paley Center TV Series"), 
			new VideoGroup("http://media.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=" + VideoController.DEFAULT_PAGE_SIZE + "&page_number=0&all=tag:season%203&all=tag:At%20the%20Paley%20Center&all=tag:screening%20room&callback=video","At the Paley Center Season 3", "At the Paley Center Season 3", "She's Making News Events for the Paley Center TV Series"), 
			new VideoGroup("http://media.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=" + VideoController.DEFAULT_PAGE_SIZE + "&page_number=0&all=tag:media_council&all=tag:screening%20room&callback=video","Paley Center Media Council", "Paley Center Media Council", "Meet the Industry Leaders")
		];
		
		/**
		* variables to handle getting a single video by id
		**/	
		this.VIDEO_ID_TOKEN = "VIDEO_ID_TOKEN";
		this.ajax_feature_video_prepopulate = "http://media.paleycenter.org/wp-content/misc/videos/index.php?find_video_by_id=true&video_id=" + this.VIDEO_ID_TOKEN + "&callback=video";
		this.incoming_feature_video = false;	
	
		/**
		* handle laying out the Brightcove feature video and headings
		**/	
		this.setFeatureVideoAndHeadings = function (is_landing_page, video_group_index, this_search_page_number){ 
			//if it's a landing page, lay out the feature video
			if (is_landing_page) {
				var this_video = this.video_groups[video_group_index].page_of_videos_array[this_search_page_number].video_array[0];

				//set feature videos in info box
				VideoController.feature_video_id = this_video.id;
				VideoController.feature_video_name = this_video.name;
				VideoController.feature_video_desc = this_video.shortDescription;
				VideoController.feature_video_url = this_video.linkURL;

				//modVP.cueVideoByID(VideoController.feature_video_id);

				doInfoBox(VideoController.feature_video_name, VideoController.feature_video_desc,  VideoController.feature_video_url, false, VideoController.feature_video_id);	
			}
			
			//if it's a landing page, lay out 3 column headings
			if (is_landing_page) {
				//set column headings and subheads
				$('#head_col_1').html(this.video_groups[0].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + this.video_groups[0].subhead).show();
				$('#head_col_2').html(this.video_groups[1].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + this.video_groups[1].subhead).show();
				$('#head_col_3').html(this.video_groups[2].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + this.video_groups[2].subhead).show();
			} 
			//if it's NOT a landing page, lay out column headings and hides the other 2
			else {
				//set column headings and subheads
				$('#head_col_1').html(this.video_groups[video_group_index].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + this.video_groups[video_group_index].subhead).show();
				$('#head_col_2').hide();
				$('#head_col_3').hide();
			}
		}



		/**
		* display Brightcove video player
		**/	
		this.buildPlayer = function buildPlayer() { 
		
			var append_string = '<!-- Start of Brightcove Player --><div style="display:none"> </div>';
			append_string += '<!-- By use of this code snippet, I agree to the Brightcove Publisher T and C found at https://accounts.brightcove.com/en/terms-and-conditions/.  --> ';
			append_string += '  <script type="text/javascript" src="http://admin.brightcove.com/js/BrightcoveExperiences.js"></script>';
			append_string += '  <script type="text/javascript" src="http://admin.brightcove.com/js/BrightcoveExperiences.js"></script>';
			append_string += '<object id="myExperience" class="BrightcoveExperience">';
			append_string += '<param name="bgcolor" value="#FFFFFF" />';
			append_string += '<param name="width" value="500" />';
			append_string += '<param name="height" value="330" />';
			append_string += '<param name="playerID" value="1679254821001" />';
			append_string += '<param name="playerKey" value="AQ~~,AAAADpP62yk~,CYkGoUDqnqWmJHL5SetwJ75jDx87buG6" />';
			append_string += '<param name="isVid" value="true" />';
			append_string += '<param name="dynamicStreaming" value="true" />';
			append_string += '<param name="wmode" value="transparent" />';
			append_string += '<param name="includeAPI" value="true" />';
			append_string += '<param name="showNoContentMessage" value="false" />';
			append_string += '<param name="templateReadyHandler" value="onTemplateReady" />';
			//append_string += '<param name="@videoPlayer" value="' + this.feature_video_id + '" />';
			append_string += '</object> <!-- End of Brightcove Player -->';
			$( "#video_player" ).append(append_string);
			
			//$( "#video_player" ).css("display","block");
		}
		
		/**
		* set info box for featured video and play video (called on play clicks)
		**/	
		this.playTitle = function playTitle(videoId, name, desc, link) {
			doInfoBox(name, desc, link, true, videoId);
			modVP.loadVideoByID(videoId);
		} 
		
		/**
		* helper method to build AJAX URL from menu or more request
		**/	
		this.getAjaxURL = function getAjaxURL(the_video_group_index, new_page_number, page_size) {
			var the_page_size = (page_size != VideoController.DEFAULT_PAGE_SIZE) ? page_size : VideoController.DEFAULT_PAGE_SIZE;
			var ajax_url = videoController.video_groups[the_video_group_index].json_call.replace(VideoController.DEFAULT_PAGE_SIZE, the_page_size);
		
			var split_url = ajax_url.split("&");

			$.each(split_url, function (i, item) { //page_number = 1, page_size = 1, serach = true
				//break out early?
				if (split_url[i].indexOf("page_number") != -1) {
					var split_param = split_url[i].split("="); //page_number, 0
							if (new_page_number > 0) {
								split_url[i] = "page_number=" + new_page_number;
								ajax_url = split_url.join("&");
							}
						}
					});
			return ajax_url;
		}
	
		/**
		* helper method to build AJAX URL from search request
		**/	
		this.getSearchAjaxURL = function getSearchAjaxURL(the_search_term, the_group_index, the_default_page_size, the_search_page_number) {
			if (debug) {
				console.log("VideoController.SEARCH_TOKEN: " + VideoController.SEARCH_TOKEN);
				console.log("this.SEARCH_TOKEN: " + this.SEARCH_TOKEN);
				console.log("this.SEARCH_PAGE_NUMBER_TOKEN: " + this.SEARCH_PAGE_NUMBER_TOKEN);
				console.log("the_group_index: " + the_group_index);
				console.log("videoController.video_groups[the_group_index].json_call: " + videoController.video_groups[the_group_index].json_call);
			}
			if (typeof the_search_page_number == 'undefined')
				the_search_page_number = 0;
			var new_search_url = this.video_groups[the_group_index].json_call.replace(this.SEARCH_TOKEN, the_search_term);
			new_search_url = new_search_url.replace(this.SEARCH_PAGE_NUMBER_TOKEN, the_search_page_number);
			return new_search_url;
		}		

		/**
		* handle incoming video id from Brightcove deep linking
		**/
		this.checkIncomingBrightcoveVideo = function checkIncomingBrightcoveVideo(the_bctid) {
			if (the_bctid != "null") {

				var ajax_feature_video_url = this.ajax_feature_video_prepopulate.replace("VIDEO_ID_TOKEN", the_bctid);
				if (debug)
					console.log("ajax_feature_video_url: " + ajax_feature_video_url);
				$.ajax({
					type: "POST",
					dataType: "json",
					contentType: "application/json",
					url: ajax_feature_video_url,
					success: function (response) {
						//as long as it's tagged as SCREENING ROOM, play it
						if (response.items[0]) {
							$.each(response.items[0].tags, function (i, item) {
								//don't show video if not tagged appropriately
								if (item.toUpperCase() === "SCREENING ROOM") {
									if (debug)
										console.log("matched SCREENING ROOM");
									incoming_feature_video = true;
									var this_video = new Video(response.items[0].id, response.items[0].name, response.items[0].shortDescription, response.items[0].linkURL);
									//videos.push(this_video);
						
									//set it as the featured video
									VideoController.feature_video_id = response.items[0].id;
									VideoController.feature_video_name = response.items[0].name;
									VideoController.feature_video_desc = response.items[0].shortDescription;
									VideoController.feature_video_url = response.items[0].linkURL;	
								}

							});					
						}
					},
					error: function(jqXHR, error, errorThrown) { 
						scrollToPlayer();
						$('#error_message').html("<p>Sorry, but the screening room is not working properly at the moment. Please try again later.</p>");
					}

				}); 
			}	
		}
	}
	
	/**
	* Set up inheritance and override methods
	* 
	* 
	* 
	**/	
	
	/**
	* make YouTubeVideoController and BrightcoveVideoController classes inherit 
	* from parent VideoController using prototype
	**/	
	YouTubeVideoController.prototype = new VideoController();
	BrightcoveVideoController.prototype = new VideoController();
	
	/**
	* set up override the YouTube methods 
	**/	
	YouTubeVideoController.prototype.handleSearchClick = function(event, ui, the_ajax_url){
	  return VideoController.prototype.handleSearchClick.call(this, event, ui, this.YOUTUBE_SEARCH_URL);
	}
	
	YouTubeVideoController.prototype.handleMoreClick = function(event, ui, the_json_datatype){
	  return VideoController.prototype.handleMoreClick.call(this, event, ui,"jsonp");
	}
	
	YouTubeVideoController.prototype.handlePlayVideoClick = function(event){
	  return VideoController.prototype.handlePlayVideoClick.call(this, event);
	}
	
	YouTubeVideoController.prototype.AddVideoGroupToArray = function(the_search_text, the_video_group_index, the_json_datatype){
	  return VideoController.prototype.AddVideoGroupToArray.call(this, the_search_text, the_video_group_index, "jsonp");
	}
	
	YouTubeVideoController.prototype.buildVideoGroupArrays = function(is_landing_page, the_json_datatype){
	  return VideoController.prototype.buildVideoGroupArrays.call(this, is_landing_page, "jsonp");
	}
	
	
	/**
	* set up override the Brightcove methods 
	**/	
	BrightcoveVideoController.prototype.handleSearchClick = function(event, ui, the_ajax_url){
		if (debug) {
			console.log("this.BRIGHTCOVE_SEARCH_URL: " + this.BRIGHTCOVE_SEARCH_URL);
			console.log("videoController.BRIGHTCOVE_SEARCH_URL: " + videoController.BRIGHTCOVE_SEARCH_URL);
			console.log("VideoController.BRIGHTCOVE_SEARCH_URL: " + VideoController.BRIGHTCOVE_SEARCH_URL);
		}
		return VideoController.prototype.handleSearchClick.call(this, event, ui, this.BRIGHTCOVE_SEARCH_URL);
	}

	BrightcoveVideoController.prototype.handleMoreClick = function(event, ui, the_json_datatype){
	  return VideoController.prototype.handleMoreClick.call(this, event, ui,"json");
	}
	
	BrightcoveVideoController.prototype.handlePlayVideoClick = function(event){
	  return VideoController.prototype.handlePlayVideoClick.call(this, event);
	}
	
	BrightcoveVideoController.prototype.AddVideoGroupToArray = function(the_search_text, the_video_group_index, the_json_datatype){
	  return VideoController.prototype.AddVideoGroupToArray.call(this, the_search_text, the_video_group_index, "json");
	}

	BrightcoveVideoController.prototype.buildVideoGroupArrays = function(is_landing_page, the_json_datatype){
	  return VideoController.prototype.buildVideoGroupArrays.call(this, is_landing_page, "json");
	}


	/**
	* manage event handling
	* 
	* 
	* 
	**/	

	/**
	* manage autocomplete search textbox 
	**/	
	$( "#autocomplete" ).autocomplete({
		source: function(req, responseFn) {
			var re = $.ui.autocomplete.escapeRegex(req.term);
			var matcher = new RegExp("^" + re, "gi");
			var a = $.grep( videoController.names_autocomplete, function(item,index){
				return matcher.test(item);
			});
			responseFn(a);
		},
		minLength: 1,
		// include return key in addition to search button click
		}).keydown(function(e){
			if (e.keyCode === 13){
				$("#search_videos").trigger('click');
			}
	});
	
	/**
	* manage menu clicks 
	**/	
	$("#menu").on( "menuselect", function( event, ui ) { 
		event.preventDefault();
		videoController.handleMenuClick (event, ui);
	});
	
	/**
	* manage search clicks 
	**/	
	$("#search_videos").on( "click", function( event, ui ) { 
		event.preventDefault();
		videoController.handleSearchClick (event, ui, this.YOUTUBE_SEARCH_URL);
	});	
	
	/**
	* manage more clicks 
	**/	
	$(".more a").on( "click", function( event, ui ) { 
		event.preventDefault();
		videoController.handleMoreClick (event, ui);
	});
	
	/**
	* manage play video clicks 
	**/	
	$(".video_cols li").click(function(event) {
		event.preventDefault();
		videoController.handlePlayVideoClick (event);
	}); 
	

	/**
	* Build the VideoController and set up the landing page
	* 
	* 
	* 
	**/	
	
	/**
	* declare and initialize the VideoController 
	**/	
	var videoController = new BrightcoveVideoController();
	//var videoController = new YouTubeVideoController();

	videoController.buildPlayer();
	
	/**
	* build the preloaded VideoGroup objects and set the landing page to true 
	**/	
	videoController.buildVideoGroupArrays(true);
	
	/**
	* set up and display the left nav menu 
	**/	
	videoController.setMenu();

	/**
	* if Brightcove videoController, check for incoming video id
	**/	
	if (videoController instanceof BrightcoveVideoController) {
		videoController.checkIncomingBrightcoveVideo(videoController.getURLParameter("bctid"));
	}
	
}); //end ready function	
	

/**
* handle Brightcove player initialization
* (outside of ready function to manage Brightcove API implementation issue)
* 
**/
function onTemplateReady(event) {
	if (debug) 
		console.log("***FIRING***: onTemplateReady");
	
	player = brightcove.api.getExperience($('#myExperience').attr("id"));
	modVP = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);

	var the_video_id = $( "#video_info" ).attr("class");

	if (debug) 
		console.log("the_video_id: " + the_video_id );

	//set up feature video
	modVP.cueVideoByID(the_video_id);
	doInfoBox(VideoController.feature_video_name, VideoController.feature_video_desc,  VideoController.feature_video_url, false, VideoController.feature_video_id);

	modExp = player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
	modCon = player.getModule(brightcove.api.modules.APIModules.CONTENT);
	social = player.getModule(brightcove.api.modules.APIModules.SOCIAL);  
}



/**
* handle info box display under video player
* (outside of ready function to manage Brightcove API implementation issue)
**/	
function doInfoBox(title, desc, link, do_scroll, video_id) {
	if (do_scroll)
		scrollToPlayer();
	var the_link = "";
	var the_title = "";
	var the_desc = "";
	if ((link) && link.length > 0)
		the_link = '<a target="_blank" href=' + link +'>More Info</a>';
	if ((title) && title.length > 0)
		the_title = 'You\'re watching <b>' + title;
	if ((desc) && desc.length > 0 && desc.length < 20)
		the_desc = desc;
	var info_box = document.getElementById("video_info");
	$( "#video_info" ).attr("class", video_id);
	info_box.innerHTML = '<div style="margin:10px;">' + the_title + '</b><br>' + the_desc + '&nbsp;&nbsp;' + the_link + '</div>';
}

/**
* scroll to video player
* (outside of ready function to manage Brightcove API implementation issue)
**/	
function scrollToPlayer(){
	$('html, body').animate({scrollTop: parseInt($('#screen').height()/2)}, 800);
}
	




