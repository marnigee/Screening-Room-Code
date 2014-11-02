

//video object
function video(id,name,shortDescription,linkURL, thumbnailURL)
{
	this.id=id;
	this.name=name;
	this.shortDescription=shortDescription;
	this.linkURL=linkURL;
	this.thumbnailURL=thumbnailURL;
}

//array of video objects
var videos = new Array();


//video_group object
function video_group(json_call,menu_text,heading,subhead,next_page)
{
	this.json_call = json_call;
	this.menu_text = menu_text;
	this.heading = heading;
	this.subhead = subhead;
	this.next_page - next_page;
	this.videos2 = new Array();
	this.getVideos2 = function getVideos2() { 
		return this.videos2;
	}
}

var DEFAULT_PAGE_SIZE = 15;
var DEFAULT_OPENING_PAGE_SIZE = 5;
var DEFAULT_VIDEO_GROUP_INDEX = 0;
var YOUTUBE_PLAY_URL = "http://youtu.be/";


//array of video_group objects
/*
var video_groups = [
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:popular&all=tag:screening%20room&sort_by=PLAYS_TOTAL:DESC&callback=video","", "Popular", "Most Watched on paleycenter.org"),
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&none=tag:paleyfest&all=tag:screening%20room&sort_by=CREATION_DATE:DESC&callback=video","", "Recently Added", "Videos Added Every Week"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:comedy&all=tag:screening%20room&callback=video","Comedy", "Comedy", "Comedy Events"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:drama&all=tag:screening%20room&callback=video","Drama", "Drama", "Drama Events"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:music&all=tag:screening%20room&callback=video","Music", "Music", "Music Events"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:issues&all=tag:screening%20room&callback=video","Issues", "Issues", "Issues Events"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:scifi&all=tag:screening%20room&callback=video","SciFi", "SciFi", "SciFi Events"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:paleydocevents&all=tag:screening%20room&callback=video","PaleyDocScene", "PaleyDocScene", "Documentary Events"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:paleyfest&all=tag:screening%20room&callback=video","PaleyFest", "PaleyFest", "See Your Favorite Shows & Stars"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:paleyafterdark&all=tag:screening%20room&callback=video","PaleyAfterDark/Paley100", "PaleyAfterDark/Paley100", "Patron Membership Events"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:womenatpaley&all=tag:screening%20room&callback=video","Women@Paley", "Women@Paley", "Accomplished women share their talents and insight"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:season%201&all=tag:At%20the%20Paley%20Center&all=tag:screening%20room&callback=video","At the Paley Center Season 1", "At the Paley Center Season 1", "Paley Center TV Series"),
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:season%202&all=tag:At%20the%20Paley%20Center&all=tag:screening%20room&callback=video","At the Paley Center Season 2", "At the Paley Center Season 2", "She's Making Media Events for the Paley Center TV Series"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:season%203&all=tag:At%20the%20Paley%20Center&all=tag:screening%20room&callback=video","At the Paley Center Season 3", "At the Paley Center Season 3", "She's Making News Events for the Paley Center TV Series"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:media_council&all=tag:screening%20room&callback=video","Paley Center Media Council", "Paley Center Media Council", "Meet the Industry Leaders")
];
*/


var video_groups2 = [
  	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:popular&all=tag:screening%20room&sort_by=PLAYS_TOTAL:DESC&callback=video","", "Popular", "Most Watched on paleycenter.org"),
  	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&none=tag:paleyfest&all=tag:screening%20room&sort_by=CREATION_DATE:DESC&callback=video","", "Recently Added", "Videos Added Every Week"), 
  	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:paleyfest&all=tag:screening%20room&callback=video","PaleyFest", "PaleyFest", "See Your Favorite Shows & Stars"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:comedy&all=tag:screening%20room&callback=video","Comedy", "Comedy", "Comedy Events"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:drama&all=tag:screening%20room&callback=video","Drama", "Drama", "Drama Events"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:music&all=tag:screening%20room&callback=video","Music", "Music", "Music Events"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:issues&all=tag:screening%20room&callback=video","Issues", "Issues", "Issues Events"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:scifi&all=tag:screening%20room&callback=video","SciFi", "SciFi", "SciFi Events"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:paleydocevents&all=tag:screening%20room&callback=video","PaleyDocScene", "PaleyDocScene", "Documentary Events"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:paleyfest&all=tag:screening%20room&callback=video","PaleyFest", "PaleyFest", "See Your Favorite Shows & Stars"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:paleyafterdark&all=tag:screening%20room&callback=video","PaleyAfterDark/Paley100", "PaleyAfterDark/Paley100", "Patron Membership Events"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:womenatpaley&all=tag:screening%20room&callback=video","Women@Paley", "Women@Paley", "Accomplished women share their talents and insight"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:season%201&all=tag:At%20the%20Paley%20Center&all=tag:screening%20room&callback=video","At the Paley Center Season 1", "At the Paley Center Season 1", "Paley Center TV Series"),
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:season%202&all=tag:At%20the%20Paley%20Center&all=tag:screening%20room&callback=video","At the Paley Center Season 2", "At the Paley Center Season 2", "She's Making Media Events for the Paley Center TV Series"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:season%203&all=tag:At%20the%20Paley%20Center&all=tag:screening%20room&callback=video","At the Paley Center Season 3", "At the Paley Center Season 3", "She's Making News Events for the Paley Center TV Series"), 
	new video_group("http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:media_council&all=tag:screening%20room&callback=video","Paley Center Media Council", "Paley Center Media Council", "Meet the Industry Leaders")
];	


var video_groups3 = [
  	new video_group("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC4-hGd01KPF1i9xSWtox0JQ&maxResults=DEFAULT_PAGE_SIZE&q=mad%20men&key=AIzaSyDien4wrgW5R-Ewzq2hRxvoofMgTLVlFO8&alt=json","Mad Men", "Mad Men", "Jon Hamm Highlights"),
  	new video_group("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC4-hGd01KPF1i9xSWtox0JQ&maxResults=DEFAULT_PAGE_SIZE&q=community&key=AIzaSyDien4wrgW5R-Ewzq2hRxvoofMgTLVlFO8&alt=json","Community", "Community", "Community Highlights"), 
  	new video_group("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC4-hGd01KPF1i9xSWtox0JQ&maxResults=DEFAULT_PAGE_SIZE&q=paleyfest&key=AIzaSyDien4wrgW5R-Ewzq2hRxvoofMgTLVlFO8&alt=json","PaleyFest", "PaleyFest", "PaleyFest Highlights"), 
];	

//for search
var SEARCH_TOKEN = "SEARCH_TOKEN";
var search_page_number = 0;
var SEARCH_PAGE_NUMBER_TOKEN = "SEARCH_PAGE_NUMBER_TOKEN";
var search_ajax_with_token = "http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_size=" + DEFAULT_PAGE_SIZE + "&page_number=SEARCH_PAGE_NUMBER_TOKEN&all=tag:screening%20room&all=search_text:" + SEARCH_TOKEN + "&callback=video";
var search_text = "";

//for featured video
var feature_video_id;
var feature_video_name;
var feature_video_desc;
var feature_video_url;

//for prepopulating names list for autocomplete search box
var prepopulate_page_number = 0;
var PREPOPULATE_PAGE_NUMBER_TOKEN = "PREPOPULATE_PAGE_NUMBER_TOKEN";
var ajax_video_prepopulate = "http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?search=true&page_number=PREPOPULATE_PAGE_NUMBER_TOKEN&fields=id,name,shortDescription,thumbnailURL,linkURL&all=tag:screening%20room&callback=video";
var names_autocomplete = new Array();

//ajax call for getting a single video by id
var VIDEO_ID_TOKEN = "VIDEO_ID_TOKEN";
var ajax_feature_video_prepopulate = "http://mediaorigin.paleycenter.org/wp-content/misc/videos/index.php?find_video_by_id=true&video_id=VIDEO_ID_TOKEN&callback=video";
var incoming_feature_video = false;


//ajax calls for opening 3-single-column page
var opening_ajax_url_1;
var opening_ajax_url_2;
var opening_ajax_url_3;


//brightcove vars
var player;
var modVP;
var modExp;
var modCon;
var social;

var videos_counter = 0;

/*
//handle YouTube JSONP
function handleYouTubeJsonp(response) {
	$.each(response.items, function (i, item) {
		//alert("names for autocomplete: " + i + response.items[i].name);
		names_autocomplete.push(response.items[i].snippet.title);
		var page_size_number = parseInt(response.nextPageToken);
		if (response.nextPageToken) {
			
		}
		//if ((response.bc.total_count/response.bc.page_size) > page_size_number) {
			//prepopulate_page_number++;
			//videoController.getAutoCompleteNames(); //call recursively
		//} 
	});
}
*/
/*
function clearScreen() {
	for (x = 0; x < DEFAULT_PAGE_SIZE; x++) {
		alert("clear screen loop: " + x);
		$('.video_cols ul:nth-child(2) > li:nth-child(' + x+1 + ')').hide();
	}
}
*/
	



$(document).ready(function() {	
	//video controller object
	function videoController() {
		//this.videos2 = new Array();
		//array of video_group objects
		this.buildPlayer = function buildPlayer() { }
		this.setFeatureVideoAndHeadings = function setFeatureVideoAndHeadings(is_landing_page) { }
		this.getAutoCompleteNames = function getAutoCompleteNames() { }
		this.buildVideoGroupArrays = function buildVideoGroupArrays() { }
		this.playTitle = function playTitle(videoId, name, desc, link) {  }
		this.setMenu = function setMenu() {  }

	}
	
	function setFeatureVideoAndHeadings (is_landing_page, video_group_index){ 
		var the_video_group;
		if (videoController instanceof youtubeVideoController) {
			the_video_group = video_groups3;
			$( "#ytplayer" ).attr("src", "https://www.youtube.com/embed/" + the_video_group[0].videos2[0].id);

		}
		else {
			the_video_group = video_groups2;
		}
			
		//set feature videos in info box
		feature_video_id = the_video_group[0].videos2[0].id;
		feature_video_name = the_video_group[0].videos2[0].name;
		feature_video_desc = the_video_group[0].videos2[0].shortDescription;
		feature_video_url = the_video_group[0].videos2[0].linkURL;
		doInfoBox(feature_video_name, feature_video_desc,  feature_video_url, false);	
				
		if (is_landing_page) {
			//alert("in pageLayout: video_groups2.videos2.length: " + video_groups2.videos2.length);
			//set feature video
			//if (typeof video_groups3[0].videos2[0] != 'undefined')	{	

			//}

			//set column headings and subheads
			$('#head_col_1').html(the_video_group[0].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + the_video_group[0].subhead).show();
			$('#head_col_2').html(the_video_group[1].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + the_video_group[1].subhead).show();
			$('#head_col_3').html(the_video_group[2].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + the_video_group[2].subhead).show();
		} 
		else {
			//set column headings and subheads
			$('#head_col_1').html(the_video_group[video_group_index].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + the_video_group[video_group_index].subhead).show();
			$('#head_col_2').hide();
			$('#head_col_3').hide();

		}
		//alert("video_groups3[0].videos2: " + video_groups3[0].videos2);
	}
	
	function youtubeVideoController() { 
		this.buildPlayer = function buildPlayer() {
			//var append_string = '<iframe style="position:relative;left:188px;top:131px;" id="ytplayer" type="text/html" width="493" height="307" src="https://www.youtube.com/embed/wn0q5XJqu6E" frameborder="0" allowfullscreen>';
			//$( "#ytplayer" ).attr("src", "https://www.youtube.com/embed/wn0q5XJqu6E");
			$( "#ytplayer" ).show();
		
		
			
//<iframe style="position:relative;left:188px;top:131px;" id="ytplayer" type="text/html" width="493" height="307" src="https://www.youtube.com/embed/wn0q5XJqu6E" frameborder="0" allowfullscreen=""></iframe>			
			
			
		 }
		 

		this.getAutoCompleteNames = function getAutoCompleteNames(arg1) { 
			//Gets all names of possible video titles for search box autocomplete
			var ajax_names = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC4-hGd01KPF1i9xSWtox0JQ&maxResults=50&key=AIzaSyDien4wrgW5R-Ewzq2hRxvoofMgTLVlFO8&alt=json";
			var ajax_names_after_pagination_check = ajax_names;
			//alert("nextPageToken: " + nextPageToken);
			if (typeof arg1 != 'undefined') {
				ajax_names_after_pagination_check = ajax_names + "&pageToken=" + arg1;
			}
			//alert("ajax_names_after_pagination_check: " + ajax_names_after_pagination_check);
			$.ajax({
				type: "POST",
				//dataType: "json",
				dataType: 'jsonp',
				contentType: "application/json",
				url: ajax_names_after_pagination_check,
				success: function (response) {
					//alert("in success!!!");
					$.each(response.items, function (i, item) {
						names_autocomplete.push(response.items[i].snippet.title);
					});	
					//alert("response.nextPageToken: " + response.nextPageToken);
					if (response.nextPageToken != null) {
							getAutoCompleteNames(response.nextPageToken); //call recursively
					}
					
				},
				error: function(jqXHR, error, errorThrown) { 
					scrollToPlayer();
					$('#error_message').html("<p>Sorry, but you've encountered a hiccup. Please try again.</p>");
				}				
					
			}); 
		}	
		
		
		this.handleMenuClick  = function handleMenuClick (event, ui){
			//alert("in handleMenuClick");
			var the_video_group_index;
			$.each(ui, function (i, item) {
			   the_video_group_index = item.find(".get_video_group").attr("id");
			});
		   //ajax_url = getAjaxURL(the_video_group_index);
			var the_ajax_url = getAjaxURL3(the_video_group_index,0,DEFAULT_PAGE_SIZE);
			//alert("the_ajax_url: " + the_ajax_url);
			$.ajax({
				type: "POST",
				dataType: "jsonp",
				contentType: "application/json",
				url: the_ajax_url,
				async: false,
				success: this.getYouTubeJson, 
				error: function(jqXHR, error, errorThrown) { 
					scrollToPlayer();
					$('#error_message').html("<p>Sorry, but you've encountered a hiccup. Please try again.</p>");
				}
				
			}); 
			setFeatureVideoAndHeadings(false, the_video_group_index);
			//hide the extra videos	
			for (x = DEFAULT_PAGE_SIZE; x > response.items.length; x--) {
				$('.video_cols ul:nth-child(2) > li:nth-child(' + x + ')').hide();
			}


			   
			/*
			if (video_groups3[the_video_group_index].videos2.length < DEFAULT_PAGE_SIZE) {
					this.buildVideoGroupArrays(false);
			} else {
				for (x=0; x < video_groups3[the_video_group_index].videos2.length; x++) {
					var this_video = video_groups3[the_video_group_index].videos2[x];
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(x+1) + ')').attr("id", this_video.id);
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(x+1) + ') img').attr("src", this_video.thumbnailURL);
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(x+1) + ') #title_isolated').html(this_video.name);
				}
				setFeatureVideoAndHeadings (false);
			}
			*/
		}


		this.getYouTubeJson = function getYouTubeJson (response) {
			//alert("in ajax success");
			//display videos and add them to videos array
			//set counter for column placement
			
			var group_counter;
			if (response.items.length == DEFAULT_PAGE_SIZE) {
				group_counter = 1;
				videos_counter = 0;
			}
			else {
				if (videos_counter == 0)
				  group_counter = 1;
				else if (videos_counter == 1)
				  group_counter = 6;
				else if (videos_counter == 2)
				  group_counter = 11;			
			}

			$.each(response.items, function (i, item) {
				//alert("response.items.length: " + response.items.length);
				//alert("item.id.videoId: " + item.id.videoId);
				//alert("item.snippet.title: " + item.snippet.title);
				//alert("item.snippet.description: " + item.snippet.description);
				//alert("item.snippet.link: " + "" + YOUTUBE_PLAY_URL + item.id.videoId);
				//alert("items loop i: " + i);
				//alert("videos_counter: " + videos_counter);
				var this_video = new video(item.id.videoId, truncate(item.snippet.title, 50), truncate(item.snippet.description, 30), "" + YOUTUBE_PLAY_URL + item.id.videoId, item.snippet.thumbnails.medium.url);
				video_groups3[videos_counter].videos2.push(this_video);
				
				


				$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(i+group_counter) + ')').attr("id", this_video.id).show();
				$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(i+group_counter) + ') img').attr("src", this_video.thumbnailURL).show();
				$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(i+group_counter) + ') #title_isolated').html(this_video.name).show();
				//$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(i+group_counter) + ') #desc_isolated').html(this_video.shortDescription).show();

/*
						$('#more_link_' + col_number + ' a').attr("id", the_video_group_index);
						$('#more_link_' + col_number + ' a').closest("span").attr("id", "" + "" + (parseInt(new_page_number) + parseInt(1)));
					}
					else {
						$('#more_link_' + col_number + ' a').attr("id", "search");
						$('#more_link_' + col_number + ' a').closest("span").attr("class", "" + "" + (parseInt(new_page_number) + parseInt(1)));
					}
				} 
				else {
					$('#more_link_' + col_number + ' a').hide();
				}
				
				// if not the loading page, clean up more links and column headings
				if (!is_loading_page) {
					$('#more_link_1 a').hide();				
*/				

				//alert("video_groups3[" + videos_counter + "].videos2[" + i + "].id: " + video_groups3[videos_counter].videos2[i].id);

				//alert("Added this video to array " + videos_counter + ": " + response.items[i].snippet.title);							
				/*
				if (i > 0) {
					//make sure there are no dupes in video array
					var exists_in_array = false;
					//$.each(this.videos2, function (x, item) {
					$.each(response.items, function (x, item) {
						if (this.videos2[x].id == response.items[i].id) {
							exists_in_array = true;
							return false;
						} 
					});
					if (!exists_in_array) {	
						var this_video = new video(response.items[x].id, response.items[x].name, response.items[x].shortDescription, response.items[x].linkURL);
						this.videos3.push(this_video);
						//alert("Added this video to array: " + response.items[i].name);
					}
					
				//alert("this.videos2.length: " + this.videos2.length);
				}
				*/
			});
			videos_counter++;
			//if it's landing page
			if (videos_counter == 2)
				setFeatureVideoAndHeadings(true);	
		}		
			
		this.buildVideoGroupArrays = function buildVideoGroupArrays(is_landing_page) { 
			var the_page_size = is_landing_page ? 5 : DEFAULT_PAGE_SIZE;
			//alert("the_page_size: " + the_page_size);
			//var the_page_size = new Boolean(is_landing_page) ? 5 : DEFAULT_PAGE_SIZE;
			for (c = 0; c < video_groups3.length; c++) {
				//alert("video_groups3.length loop: " + c);
		
				var the_ajax_url = getAjaxURL3(c,0,the_page_size);
				/*
				$('#more_link_1 a').attr("id", the_video_group_index);
				$('#more_link_1 a').closest("span").attr("id", "" + "" + (parseInt(new_page_number) + parseInt(1)));
				$('#more_link_1 a').hide();	
				*/
				//alert("the_ajax_url: " + the_ajax_url);
				$.ajax({
					type: "POST",
					dataType: "jsonp",
					contentType: "application/json",
					url: the_ajax_url,
					async: false,
					success: this.getYouTubeJson, 
					error: function(jqXHR, error, errorThrown) { 
						scrollToPlayer();
						$('#error_message').html("<p>Sorry, but you've encountered a hiccup. Please try again.</p>");
					}
					
				}); 				
				/*$.ajax({
					type: "POST",
					dataType: "jsonp",
					contentType: "application/json",
					url: the_ajax_url,
					async: false,
					selfDom : $(item),
        			selfData : c,					
        			success: getYouTubeJson(data, code, jqXHR){
            			// in $.ajax callbacks, 
            			// [this] keyword references to the options you gived to $.ajax
            			// if you had not specified the context of $.ajax callbacks.
            			// see http://api.jquery.com/jquery.ajax/#jQuery-ajax-settings context
            			var $item = this.selfDom;
            			var selfdata = this.selfData;
            			$item.html( selfdata );
        				//this.getYouTubeJson, 
        			},
					error: function(jqXHR, error, errorThrown) { 
						scrollToPlayer();
						$('#error_message').html("<p>Sorry, but you've encountered a hiccup. Please try again.</p>");
					}
				}); */
			}
		}
		this.playTitle = function playTitle(videoId, name, desc, link) {
			doInfoBox(name, desc, link, true);
			$( "#ytplayer" ).attr("src", "https://www.youtube.com/embed/" + videoId + "?autoplay=1");
			//modVP.loadVideoByID(videoId);
		} 
		
		this.setMenu = function setMenu() {  
			$(function() {
				$.each( video_groups3, function( index, value ) {
					if (video_groups3[index].menu_text.length > 0)
						$("#menu").append("<li id='sr-menu'><a style='z-index:10000;' class='get_video_group' id = " + index + " href=''>" + video_groups3[index].menu_text + "</a></li>");
				});
				$( "#menu" ).menu();
			});		
		}

	}

	function brightcoveVideoController() { 

		this.buildPlayer = function buildPlayer() { 
			//var test_element = $( "div" );
			//alert("before append");
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
			append_string += '</object> <!-- End of Brightcove Player -->';
			$( "#video_player" ).append(append_string);
		}
		/*
		this.setFeatureVideoAndHeadings = function setFeatureVideoAndHeadings(is_landing_page) { 
			if (is_landing_page) {
				//alert("in pageLayout: video_groups2.videos2.length: " + video_groups2.videos2.length);
				//set feature video
				feature_video_id = video_groups2[1].videos2[0].id;
				feature_video_name = video_groups2[1].videos2[0].name;
				feature_video_desc = video_groups2[1].videos2[0].shortDescription;
				feature_video_url = video_groups2[1].videos2[0].linkURL;
	
				//set column headings and subheads
				$('#head_col_1').html(video_groups2[0].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + video_groups2[0].subhead);
				$('#head_col_2').html(video_groups2[1].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + video_groups2[1].subhead);
				$('#head_col_3').html(video_groups2[2].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + video_groups2[2].subhead);
			} 
			else {
				//set column headings and subheads
				$('#head_col_1').html(video_groups2[0].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + video_groups2[0].subhead);

			}	
		}
		*/
		this.buildVideoGroupArrays = function buildVideoGroupArrays(is_landing_page) {
			//this.videos2[0] = new video("3742597745001","title: so-called life" ,"desc: so-called life","link: so-called life", "http://brightcove.vo.llnwd.net/d21/unsecured/media/62612233001/201408/1750/62612233001_3743750910001_thumbnail-for-video-3742597745001.jpg?pubId=62612233001");
			
			var the_video_group_index;
			//$.each(ui, function (i, item) {
			   //the_video_group_index = item.find(".get_video_group").attr("id");
			//});
			//alert("is_landing_page: " + is_landing_page);
			var the_page_size = is_landing_page ? 5 : DEFAULT_PAGE_SIZE;
			//alert("the_page_size: " + the_page_size);
			//var the_page_size = new Boolean(is_landing_page) ? 5 : DEFAULT_PAGE_SIZE;
			for (c = 0; c < video_groups2.length; c++) {
				//alert("video_groups2.length loop: " + c);
				
				//set counter for column placement
				var group_counter = 1;
				if (c == 1)
					group_counter = 6;
				else if (c == 2)
					group_counter = 11;
					
				var the_ajax_url = getAjaxURL2(c,0,the_page_size);
				//alert("the_ajax_url: " + the_ajax_url);
				$.ajax({
					type: "POST",
					dataType: "json",
					contentType: "application/json",
					url: the_ajax_url,
					async : false,
					success: function (response) {
						//alert("in ajax success");
						//display videos and add them to videos array
						$.each(response.items, function (i, item) {
							//alert("response.items.length: " + response.items.length);
							//alert("item.id: " + item.id);
							//alert("i.id: " + i.id);
							//alert("response.items[i].id: " + response.items[i].id);
							//alert("items loop i: " + i);
							var this_video = new video(item.id, item.name, item.shortDescription, item.linkURL, item.thumbnailURL);
							//alert("c: " + c);
							
							//only want 3 columns on the page
							if (c < 3) {
								//alert("this_video.name: " + this_video.name);
								var the_html = '<a class="thumbnail" href=""><img src="' + this_video.thumbnailURL + '" width="120" border="0" /></a>';
								the_html += '<div class="title_wrapper"><a class="title" href="" id="sr-title">';
								the_html += this_video.name;
								the_html += '<br /></a><span class="desc" id="sr-date">';
								the_html += this_video.shortDescription;
								the_html += '<br /></span></div><!-- end title_wrapper -->';
								//add videos to layout
							
								//$('.video_cols ul:nth-child(2) > li:nth-child > img).attr(
							
								//alert("this_video.name: " + this_video.name);
								var the_html2 = '<a class="thumbnail" href=""><img src="http://brightcove04.o.brightcove.com/62612233001/62612233001_74713775001_th-74713244001.jpg?pubId=62612233001" width="120" border="0" /></a><div class="title_wrapper"><a class="title" href="" id="sr-title">Title</span><br /></a><span class="desc" id="sr-date"><span id="desc_isolated">Description</span><br /></span></div>';
							
								$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(i+group_counter) + ')').attr("id", this_video.id);
								$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(i+group_counter) + ') img').attr("src", this_video.thumbnailURL);
								$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(i+group_counter) + ') #title_isolated').html(this_video.name);
								$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(i+group_counter) + ') #desc_isolated').html(this_video.shortDescription);
							}
							
							
							//$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(i+group_counter) + ')').html(the_html);
										
							

							//alert("video_groups2.videos[" + c + "].menu_text: " + video_groups2[c].menu_text);
							video_groups2[c].videos2.push(this_video);
							//this.videos2.push(this_video);
							//alert("Added this video to array: " + response.items[i].name);							
							/*
							if (i > 0) {
								//make sure there are no dupes in video array
								var exists_in_array = false;
								//$.each(this.videos2, function (x, item) {
								$.each(response.items, function (x, item) {
									if (this.videos2[x].id == response.items[i].id) {
										exists_in_array = true;
										return false;
									} 
								});
								if (!exists_in_array) {	
									var this_video = new video(response.items[x].id, response.items[x].name, response.items[x].shortDescription, response.items[x].linkURL);
									this.videos2.push(this_video);
									//alert("Added this video to array: " + response.items[i].name);
								}
								
							//alert("this.videos2.length: " + this.videos2.length);
							}
							*/
						});
					
					},	
					
					error: function(jqXHR, error, errorThrown) { 
						scrollToPlayer();
						$('#error_message').html("<p>Sorry, but you've encountered a hiccup. Please try again.</p>");
					}
					

				}); 
				the_video_group_index = c;
				setFeatureVideoAndHeadings(true, the_video_group_index);	
			}
			
		}
		
		this.handleMenuClick  = function handleMenuClick (event, ui){
			//alert("in handleMenuClick");
			//clearScreen();	
			var the_video_group_index;
			$.each(ui, function (i, item) {
			   the_video_group_index = item.find(".get_video_group").attr("id");
			});
			
			//show all
			//for (x = 0; x < DEFAULT_PAGE_SIZE; x++) {
				//$('.video_cols ul:nth-child(2) > li:nth-child(' + x+1 + ')').show();
			//}			
			
		   //ajax_url = getAjaxURL(the_video_group_index);
			var the_ajax_url = getAjaxURL2(the_video_group_index,0,DEFAULT_PAGE_SIZE);
			//alert("the_ajax_url: " + the_ajax_url);
			$.ajax({
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				url: the_ajax_url,
				async : false,
				success: function (response) {
					//alert("in ajax success");
					//display videos and add them to videos array
					
					var group_counter;
					if (response.items.length == DEFAULT_PAGE_SIZE) {
						group_counter = 1;
						videos_counter = 0;
					}
					else {
						if (videos_counter == 0)
						  group_counter = 1;
						else if (videos_counter == 1)
						  group_counter = 6;
						else if (videos_counter == 2)
						  group_counter = 11;			
					}	
								
					$.each(response.items, function (i, item) {
						var this_video = new video(item.id, item.name, item.shortDescription, item.linkURL, item.thumbnailURL);
						$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(i+group_counter) + ')').attr("id", this_video.id).show();
						$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(i+group_counter) + ') img').attr("src", this_video.thumbnailURL).show();
						$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(i+group_counter) + ') #title_isolated').html(this_video.name).show();
						$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(i+group_counter) + ') #desc_isolated').html(this_video.shortDescription).show();						
						/*
						if (i > 0) {
							//make sure there are no dupes in video array
							var exists_in_array = false;
							//$.each(this.videos2, function (x, item) {
							$.each(response.items, function (x, item) {
								if (this.videos2[x].id == response.items[i].id) {
									exists_in_array = true;
									return false;
								} 
							});
							if (!exists_in_array) {	
								var this_video = new video(response.items[x].id, response.items[x].name, response.items[x].shortDescription, response.items[x].linkURL);
								this.videos2.push(this_video);
								//alert("Added this video to array: " + response.items[i].name);
							}
							
						//alert("this.videos2.length: " + this.videos2.length);
						}
						*/
						for (x = DEFAULT_PAGE_SIZE; x > response.items.length; x--) {
							$('.video_cols ul:nth-child(2) > li:nth-child(' + x + ')').hide();
						}
					});
					
				
				},	
				
				error: function(jqXHR, error, errorThrown) { 
					scrollToPlayer();
					$('#error_message').html("<p>Sorry, but you've encountered a hiccup. Please try again.</p>");
				}
				

			}); 
			setFeatureVideoAndHeadings(false, the_video_group_index);	

			   
			/*
			if (video_groups3[the_video_group_index].videos2.length < DEFAULT_PAGE_SIZE) {
					this.buildVideoGroupArrays(false);
			} else {
				for (x=0; x < video_groups3[the_video_group_index].videos2.length; x++) {
					var this_video = video_groups3[the_video_group_index].videos2[x];
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(x+1) + ')').attr("id", this_video.id);
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(x+1) + ') img').attr("src", this_video.thumbnailURL);
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(x+1) + ') #title_isolated').html(this_video.name);
				}
				setFeatureVideoAndHeadings (false);
			}
			*/
		}		
		this.getAutoCompleteNames = function getAutoCompleteNames() {
			//Gets all names of possible video titles for search box autocomplete
			ajax_names = ajax_video_prepopulate.replace("PREPOPULATE_PAGE_NUMBER_TOKEN", prepopulate_page_number);
			$.ajax({
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				url: ajax_names,
				success: function (response) {
					$.each(response.items, function (i, item) {
						//alert("names for autocomplete: " + i + response.items[i].name);
						names_autocomplete.push(response.items[i].name);
					});
					var page_size_number = parseInt(response.bc.page_number+1);
					if ((response.bc.total_count/response.bc.page_size) > page_size_number) {
						prepopulate_page_number++;
						getAutoCompleteNames(); //call recursively
					} 
				},

			}); 
		}
		
		
		this.playTitle = function playTitle(videoId, name, desc, link) {
			doInfoBox(name, desc, link, true);
			modVP.loadVideoByID(videoId);
		} 
		
		this.setMenu = function setMenu() {  
			$(function() {
				$.each( video_groups2, function( index, value ) {
					if (video_groups2[index].menu_text.length > 0)
						$("#menu").append("<li id='sr-menu'><a style='z-index:10000;' class='get_video_group' id = " + index + " href=''>" + video_groups2[index].menu_text + "</a></li>");
				});
				$( "#menu" ).menu();
			});		
		}
	}
	
	



	function getAjaxURL2(the_video_group_index, new_page_number, page_size) {
		//alert("page_size: " + page_size);
		var the_page_size = (page_size != DEFAULT_PAGE_SIZE) ? page_size : DEFAULT_PAGE_SIZE;
		//var the_page_size = 5;
		//alert("the_page_size: " + the_page_size);
		var ajax_url = video_groups2[the_video_group_index].json_call.replace("DEFAULT_PAGE_SIZE", the_page_size);

		var split_url = ajax_url.split("&");

		$.each(split_url, function (i, item) { //page_number = 1, page_size = 1, serach = true
			//how to break out early?
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
	
	
	function getAjaxURL3(the_video_group_index, new_page_number, page_size) {
		//alert("page_size: " + page_size);
		var the_page_size = (page_size != DEFAULT_PAGE_SIZE) ? page_size : DEFAULT_PAGE_SIZE;
		//var the_page_size = 5;
		//alert("the_page_size: " + the_page_size);
		var ajax_url = video_groups3[the_video_group_index].json_call.replace("DEFAULT_PAGE_SIZE", the_page_size);
		/*
		var split_url = ajax_url.split("&");

		$.each(split_url, function (i, item) { //page_number = 1, page_size = 1, serach = true
			//how to break out early?
			if (split_url[i].indexOf("page_number") != -1) {
				var split_param = split_url[i].split("="); //page_number, 0
						if (new_page_number > 0) {
							split_url[i] = "page_number=" + new_page_number;
							ajax_url = split_url.join("&");
						}
					}
				});
		*/
		return ajax_url;
	}

	//make child class inherit from parent using prototype
	youtubeVideoController.prototype = new videoController();
	brightcoveVideoController.prototype = new videoController();

	//var ytController = new youtubeVideoController();
	
	//var videoController = new brightcoveVideoController();
	var videoController = new youtubeVideoController();

	//bcController.buildPlayer();
	videoController.buildPlayer();

	/**
	* Handle incoming video id from Brightcove deep linking
	* 
	**/
	if (getURLParameter("bctid") != "null") {
		
		var ajax_feature_video = ajax_feature_video_prepopulate.replace("VIDEO_ID_TOKEN", getURLParameter("bctid"));

		$.ajax({
			type: "POST",
			dataType: "json",
			contentType: "application/json",
			url: ajax_feature_video,
			success: function (response) {
				//add it to the videos array--make sure there are no dupes
				if (response.items[0]) {
					$.each(response.items[0].tags, function (i, item) {
						//don't show video if not tagged appropriately
						if (item.toUpperCase() === "SCREENING ROOM") {
							incoming_feature_video = true;
							var this_video = new video(response.items[0].id, response.items[0].name, response.items[0].shortDescription, response.items[0].linkURL);
							videos.push(this_video);
							
							//set it as the featured video
							feature_video_id = response.items[0].id;
							feature_video_name = response.items[0].name;
							feature_video_desc = response.items[0].shortDescription;
							feature_video_url = response.items[0].linkURL;	
						}
	
					});					
				}
				else {
					feature_video_id = "";
					feature_video_name = "";
					feature_video_desc = "";
					feature_video_url = "";
				}
			},
			error: function(jqXHR, error, errorThrown) { 
				scrollToPlayer();
				$('#error_message').html("<p>Sorry, but the screening room is not working properly at the moment. Please try again later.</p>");
          	}

		}); 
	}
	
	
	/**
	* Manages autocomplete search textbox 
	*	
	* 
	**/		
	$( "#autocomplete" ).autocomplete({
		source: function(req, responseFn) {
			var re = $.ui.autocomplete.escapeRegex(req.term);
			var matcher = new RegExp("^" + re, "gi");
			var a = $.grep( names_autocomplete, function(item,index){
				return matcher.test(item);
			});
			responseFn(a);
		},
		minLength: 1,
		}).keydown(function(e){
			if (e.keyCode === 13){
				$("#search_videos").trigger('click');
			}
	});

	
	/**
	* Manages user interaction to play a single video 
	*	
	* 
	**/	
	$(".video_cols a").click(function(event) {
		event.preventDefault();
		//alert("in click function!");
		var the_video_id = $(this).closest("li").attr("id");
		//alert("the_video_id: " + the_video_id);
		var the_video_group;
		if (videoController instanceof youtubeVideoController)
			the_video_group = video_groups3;
		else
			the_video_group = video_groups2;	
		
		//var the_videos = new Array();
			//the_video_group[0].videos2[0]
			
		for (x=0;x<the_video_group.length;x++) {
			//alert("x: " + x);	
			$.each(the_video_group[x].videos2, function (i, item) {
				if (the_video_group[x].videos2[i].id == the_video_id) {
					videoController.playTitle(the_video_group[x].videos2[i].id, the_video_group[x].videos2[i].name, the_video_group[x].videos2[i].shortDescription, the_video_group[x].videos2[i].linkURL);
					return false;
				}	
			});	
		}
	}); //end click function
	
	
		
	
	/**
	* Sets the left navigation menu items
	* 
	**/	
	/*
	$(function() {
		$.each( video_groups, function( index, value ) {
			if (video_groups[index].menu_text.length > 0)
				$("#menu").append("<li id='sr-menu'><a style='z-index:10000;' class='get_video_group' id = " + index + " href=''>" + video_groups[index].menu_text + "</a></li>");
		});
		$( "#menu" ).menu();
	});
	*/

	/**
	* Handles 3 major types of user interactions:
	*	1) Menu
	*	2) Search
	*	3) More Results ("see more")
	* 
	**/
	//menu clicks
	$("#menu").on( "menuselect", function( event, ui ) { 
		//alert("in menu select");
		event.preventDefault();
		videoController.handleMenuClick (event, ui);
	});
	
	//search clicks 
	$("#search_videos").click(loadVideoPrep);
	
	//"see more" clicks
	$(".more a").click(loadVideoPrep);	
	
	/**
	* Builds Ajax call depending on type of user interaction 
	*
	* 
	**/	
	//load videos, create video objects and add them to videos array
	function loadVideoPrep(event, ui) {
		event.preventDefault();
		
		//clear any error messages
		$("#error_message").html("");
		
		var new_page_number = 0; //default from menu item start
		var new_url;
		var ajax_url;
		var the_video_group_index;
		var is_search = false;
		var more_link_id;
		
		var click_source;
		if (event.target.id == "search_videos" || event.target.id == "autocomplete")
			click_source = "search";
		else if (event.target.id == "menu")
			click_source = "menu";
		else {
			click_source = "more_link";
			more_link_id = "#" + event.target.parentNode.parentNode.id + ' a';
		}
			
		

		//determine what kind of click this is and build appropriate Ajax URL
		switch(click_source)
		{
			case "menu":
				$.each(ui, function (i, item) {
					the_video_group_index = item.find(".get_video_group").attr("id");
					ajax_url = getAjaxURL(the_video_group_index);
				});
  				break;
			case "search":
				search_text = $( "#autocomplete" ).val();
				new_page_number = $(more_link_id).closest("span").attr("class");  	
				ajax_url = getSearchAjaxURL(search_text, new_page_number);
				is_search = true;
  				break;
			case "more_link":
				//distinguish between a "search" and "menu" more link
				if ($('#more_link_3 a').attr("id") == "search") {
					new_page_number = $(more_link_id).closest("span").attr("class"); 
					ajax_url = getSearchAjaxURL(search_text, new_page_number); 	
					is_search = true;
				} 
				else {
					the_video_group_index = $(more_link_id).attr("id");
					new_page_number = $(more_link_id).closest("span").attr("id");  
					ajax_url = getAjaxURL(the_video_group_index, new_page_number);
					search_text = "";	
				}
				break;
		} 
		loadVideos(ajax_url, the_video_group_index, new_page_number, false, is_search, more_link_id);
	}; //end click function	
		
		
	/**
	* Loads video thumbnail layouts and manages "see more" links
	*	
	* 
	**/		
	function loadVideos(ajax_url, the_video_group_index, new_page_number, is_loading_page, is_search, the_more_link) {
		$.ajax({
			type: "POST",
			dataType: "json",
			contentType: "application/json",
			url: ajax_url,
			success: function (response) {
				var slot_number_increase = 0;
				var col_number = 3;
				if (is_loading_page) {
					if (the_more_link == "#more_link_1 a") {
						slot_number_increase = 0;
						col_number = 1;
					}
					else if (the_more_link == "#more_link_2 a") {
						slot_number_increase = 5;
						col_number = 2;
					}
					else if (the_more_link == "#more_link_3 a") {
						if (is_loading_page)
							slot_number_increase = 10;
						col_number = 3;
					}
				}
				//display videos and add them to videos array
				$.each(response.items, function (i, item) {
					if ((is_loading_page && col_number == 2) && (i == 0) && (!incoming_feature_video)) {
						//set first video as feature video to cue in player only once on page load and set column heading
						feature_video_id = response.items[i].id;
						feature_video_name = response.items[i].name;
						feature_video_desc = response.items[i].shortDescription;
						feature_video_url = response.items[i].linkURL;
					}
					if ($('#slot_' + parseInt(i + slot_number_increase)).hide())
						$('#slot_' + parseInt(i + slot_number_increase)).show();
					$('#slot_' + parseInt(i + slot_number_increase)).find('img').attr("src", response.items[i].thumbnailURL);
					$('#slot_' + parseInt(i + slot_number_increase)).find('#title_isolated').text(response.items[i].name);
					$('#slot_' + parseInt(i + slot_number_increase)).find('#desc_isolated').text(response.items[i].shortDescription);
					$('#slot_' + parseInt(i + slot_number_increase)).find('a').attr("id", response.items[i].id);
					
					//set headings
					if (is_loading_page)	
						$('#head_col_' + col_number).html(video_groups[the_video_group_index].heading + "<br><span class='sr-desc' id='subhead_col_" + col_number + "'>" + video_groups[the_video_group_index].subhead);
					else if (!is_search)
						$('#head_col_1').html(video_groups[the_video_group_index].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + video_groups[the_video_group_index].subhead);
					else
						$('#head_col_1').html("Search Results: " + search_text);					

					//make sure there are no dupes in video array
					var exists_in_array = false;
					$.each(videos, function (x, item) {
						if (videos[x].id == response.items[i].id) {
							exists_in_array = true;
							return false;
						} 
					});
					if (!exists_in_array) {	
						var this_video = new video(response.items[i].id, response.items[i].name, response.items[i].shortDescription, response.items[i].linkURL);
						videos.push(this_video);
					}
				});
				
				if (!is_loading_page) {
					if (response.items.length < DEFAULT_PAGE_SIZE) {
						for (i = response.items.length; i < DEFAULT_PAGE_SIZE; i++)
							$('#slot_' + i).hide();
					}
				}
				
				//check if there are more results, and then manage the search link
				var page_size_number = parseInt(response.bc.page_number+1);
				if ((response.bc.total_count/response.bc.page_size) > page_size_number) {
					if ($('#more_link_' + col_number + ' a').hide())
						$('#more_link_' + col_number + ' a').show();
					$('#more_link_' + col_number + ' a').text("See more >");
					if (!is_search) {
						$('#more_link_' + col_number + ' a').attr("id", the_video_group_index);
						$('#more_link_' + col_number + ' a').closest("span").attr("id", "" + "" + (parseInt(new_page_number) + parseInt(1)));
					}
					else {
						$('#more_link_' + col_number + ' a').attr("id", "search");
						$('#more_link_' + col_number + ' a').closest("span").attr("class", "" + "" + (parseInt(new_page_number) + parseInt(1)));
					}
				} 
				else {
					$('#more_link_' + col_number + ' a').hide();
				}
				
				// if not the loading page, clean up more links and column headings
				if (!is_loading_page) {
					$('#more_link_1 a').hide();
					$('#more_link_2 a').hide();
					$('#head_col_2').html("");
					$('#head_col_3').html("");
				}
				//if loading page, continue to load single-row columns
				if (is_loading_page) {
					if (the_more_link == "#more_link_1 a")
						loadVideos(opening_ajax_url_2, 1, 1, true, false, "#more_link_2 a");
					if (the_more_link == "#more_link_2 a")
						loadVideos(opening_ajax_url_3, 8, 1, true, false, "#more_link_3 a");
				}
			},
			error: function(jqXHR, error, errorThrown) { 
				scrollToPlayer();
				$('#error_message').html("<p>Sorry, but you've encountered a hiccup. Please try again.</p>");
          	}
		}); 
	}
	
	
	/**
	* Helper functions 
	*	
	* 
	**/		
	function getAjaxURL(the_video_group_index, new_page_number) {
		var ajax_url = video_groups[the_video_group_index].json_call.replace("DEFAULT_PAGE_SIZE", DEFAULT_PAGE_SIZE);
		
		var split_url = ajax_url.split("&");
  
		$.each(split_url, function (i, item) { //page_number = 1, page_size = 1, serach = true
			//how to break out early?
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
	
	
	
	function getSearchAjaxURL(the_search_term, the_search_page_number) {
		var new_search_url = search_ajax_with_token.replace(SEARCH_TOKEN, the_search_term);
		new_search_url = new_search_url.replace(SEARCH_PAGE_NUMBER_TOKEN, the_search_page_number);
		return new_search_url;
	}
	
	
	/**
	* Brightcove functions 
	*	
	* 
	**/	
/*
	function playTitle(videoId, name, desc, link) {
		doInfoBox(name, desc, link, true);
			modVP.loadVideoByID(videoId);
	} 
*/	
	/**
	* Trigger initial page load (gets the video names list for search autocomplete and loads videos)
	*	
	* 
	**/	
	
	//getAutocompleteVideoNames();
	videoController.getAutoCompleteNames();
	//alert("autocomplete done.");
	videoController.buildVideoGroupArrays(true);
	//alert("buildVideoGroupArrays done.");
	videoController.setMenu();
	//alert("setMenu done.");
	//videoController.setFeatureVideoAndHeadings(true);
	
	
	//alert("video_groups3[0].videos2[0].id: " + video_groups3[0].videos2[0].id);
	//window.setTimeout(videoController.setFeatureVideoAndHeadings(true) ,120000);
	//videoController.setFeatureVideoAndHeadings(true);
	//alert("video_groups3[0].heading: " + video_groups3[0].heading);
	//alert("video_groups3[0].videos2[0]: " + video_groups3[0].videos2[0]);
	//videoController.setFeatureVideoAndHeadings(true);
	//alert("video_groups3[0].getVideos2()[0].id: " + video_groups3[0].getVideos2()[0].id);

	//if (typeof video_groups3[0].videos2[0] == 'undefined') {
		//setTimeout(videoController.setFeatureVideoAndHeadings(true), 10000);
	//}



	
	//pageLayout(true); 
	//alert("before buildPlayer()");
	
	//ytController.buildPlayer();
	//alert("after buildPlayer()");
	
	
	
	//set ajax calls for opening 3-single-columns page
	//opening_ajax_url_1 = video_groups[0].json_call.replace("DEFAULT_PAGE_SIZE", DEFAULT_OPENING_PAGE_SIZE);
	//opening_ajax_url_2 = video_groups[1].json_call.replace("DEFAULT_PAGE_SIZE", DEFAULT_OPENING_PAGE_SIZE);
	//opening_ajax_url_3 = video_groups[8].json_call.replace("DEFAULT_PAGE_SIZE", DEFAULT_OPENING_PAGE_SIZE);
	
	//loadVideos(opening_ajax_url_1, 0, 1, true, false, "#more_link_1 a");
	//alert("bcController.videos2.length: " + bcController.videos2.length);
	
	
	
	/**
	* Layout Category Menu, Heads and Subheads, and Thumbnail Sections
	* 
	**/
	/*
	function pageLayout(is_landing_page) {
		if (is_landing_page) {
			//alert("in pageLayout: video_groups2.videos2.length: " + video_groups2.videos2.length);
			//set feature video
			feature_video_id = video_groups2[1].videos2[0].id;
			feature_video_name = video_groups2[1].videos2[0].name;
			feature_video_desc = video_groups2[1].videos2[0].shortDescription;
			feature_video_url = video_groups2[1].videos2[0].linkURL;
		
			//set column headings and subheads
			$('#head_col_1').html(video_groups2[0].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + video_groups2[0].subhead);
			$('#head_col_2').html(video_groups2[1].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + video_groups2[1].subhead);
			$('#head_col_3').html(video_groups2[2].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + video_groups2[2].subhead);
		} 
		else {
	
			//set column headings and subheads
			$('#head_col_1').html(video_groups2[0].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + video_groups2[0].subhead);
	
		}
	}
	*/
}); //end ready function	
	

function onTemplateReady(event) {
		player = brightcove.api.getExperience($('#myExperience').attr("id"));
		modVP = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
		
		//set up feature video
		//alert("in onTemplateReady--feature_video_id: " + feature_video_id);
		modVP.cueVideoByID(feature_video_id);
		doInfoBox(feature_video_name, feature_video_desc,  feature_video_url, false);

		modExp = player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
		modCon = player.getModule(brightcove.api.modules.APIModules.CONTENT);
		social = player.getModule(brightcove.api.modules.APIModules.SOCIAL);  
	}


/**
* Helper functions
*	
* 
**/	
function scrollToPlayer(){
	$('html, body').animate({scrollTop: parseInt($('#screen').height()/2)}, 800);
}

function doInfoBox(title, desc, link, do_scroll) {
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
	//alert("typeof videoController == 'youtubeVideoController': " + (typeof videoController == 'youtubeVideoController'));
	info_box.innerHTML = '<div style="margin:10px;">' + the_title + '</b><br>' + the_desc + '&nbsp;&nbsp;' + the_link + '</div>';
}


function truncate(text, length, ellipsis) {
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

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}



