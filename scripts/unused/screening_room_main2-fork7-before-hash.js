

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
	this.next_page = next_page;
	this.videos = new Array();
	//this.getVideos2 = function getVideos2() { 
		//return this.videos2;
	//}
}

var DEFAULT_PAGE_SIZE = 15;
var DEFAULT_HOME_PAGE_COLUMN_SIZE = 3;
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
		//default video_group in parent
		/*
		this.video_groups = [
			new video_group("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC4-hGd01KPF1i9xSWtox0JQ&maxResults=DEFAULT_PAGE_SIZE&q=mad%20men&key=AIzaSyDien4wrgW5R-Ewzq2hRxvoofMgTLVlFO8&alt=json","Mad Men", "Mad Men", "Jon Hamm Highlights"),
			new video_group("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC4-hGd01KPF1i9xSWtox0JQ&maxResults=DEFAULT_PAGE_SIZE&q=community&key=AIzaSyDien4wrgW5R-Ewzq2hRxvoofMgTLVlFO8&alt=json","Community", "Community", "Community Highlights"), 
			new video_group("https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC4-hGd01KPF1i9xSWtox0JQ&maxResults=DEFAULT_PAGE_SIZE&q=paleyfest&key=AIzaSyDien4wrgW5R-Ewzq2hRxvoofMgTLVlFO8&alt=json","PaleyFest", "PaleyFest", "PaleyFest Highlights"), 
		];
		*/
		//this.video_groups = function {
		
		
		//}
		//this.videos2 = new Array();
		//array of video_group objects
		/*
		var handleData = function (response, textStatus, jqXHR) {
    		alert("in parent handledata! jqXHR.video_group_index: " + jqXHR.video_group_index);
    		var the_video_group;
			if (videoController instanceof youtubeVideoController)
				the_video_group = video_groups3;
			else
				the_video_group = video_groups2;	


			$.each(response.items, function (i, item) {
				//alert("response.items.length: " + response.items.length);
				//alert("item.id.videoId: " + item.id.videoId);
				//alert("item.snippet.title: " + item.snippet.title);
				//alert("item.snippet.description: " + item.snippet.description);
				//alert("item.snippet.link: " + "" + YOUTUBE_PLAY_URL + item.id.videoId);
				//alert("items loop i: " + i);
				//alert("videos_counter: " + videos_counter);
				var this_video = new video(item.id.videoId, truncate(item.snippet.title, 50), truncate(item.snippet.description, 30), "" + YOUTUBE_PLAY_URL + item.id.videoId, item.snippet.thumbnails.medium.url);
				the_video_group[jqXHR.video_group_index].videos2.push(this_video);
				
			});
			//videos_counter++;
			//if it's landing page
			//if (group_counter > 6)
				//setFeatureVideoAndHeadings(true, jqXHR.video_group_index);	    		
    		
    		
		}
		*/
		this.buildPlayer = function buildPlayer() { }
		this.setFeatureVideoAndHeadings = function setFeatureVideoAndHeadings(is_landing_page) { }
		this.getAutoCompleteNames = function getAutoCompleteNames() { }
		/*
		//convert ajax calls into video object arrays of DEFAULT PAGE SIZE
		this.buildVideoGroupArrays = function buildVideoGroupArrays() { 
			var the_video_group;
			if (videoController instanceof youtubeVideoController)
				the_video_group = video_groups3;
			else
				the_video_group = video_groups2;	
			for (c = 0; c < the_video_group.length; c++) {
				//alert("video_groups3.length loop: " + c);
		
				var the_ajax_url = getAjaxURL3(c,0,the_page_size);
				//alert("the_ajax_url: " + the_ajax_url);
				$.ajax({
					type: "POST",
					dataType: "jsonp",
					contentType: "application/json",
					url: the_ajax_url,
					async: false,
					beforeSend  : function(XHR) {
            			XHR.video_group_index = c;            	
				   },
					
					success : handleData,
					error: function(jqXHR, error, errorThrown) { 
						scrollToPlayer();
						$('#error_message').html("<p>Sorry, but you've encountered a hiccup. Please try again.</p>");
					}
					
				}); 				
			}		
		}
		*/
		this.playTitle = function playTitle(videoId, name, desc, link) {  }
		this.setMenu = function setMenu() {  }

	}


	videoController.prototype.populateVideoGroupObjectWithVideos = function (response, textStatus, jqXHR) {

		
		var the_video_group = videoController.video_groups[jqXHR.video_group_index];
		
		//var the_video_group = this.video_groups[jqXHR.video_group_index];
		
		//set next_page of search results in video_group objects
		//handle landing page 5 vs 15 logic
		//if (!jqXHR.is_landing_page) {
			if (videoController instanceof brightcoveVideoController) 
				videoController.video_groups[jqXHR.video_group_index].next_page = parseInt(response.bc.page_number) + 1;
			else if (videoController instanceof youtubeVideoController)
				videoController.video_groups[jqXHR.video_group_index].next_page = response.nextPageToken;
		//}
		
		alert("videoController.video_groups[jqXHR.video_group_index].next_page: " + videoController.video_groups[jqXHR.video_group_index].next_page);
			
		//alert("videoController.video_groups[" + jqXHR.video_group_index + "].next_page: " + videoController.video_groups[jqXHR.video_group_index].next_page);

		//if 15 or more videos, empty array
		if (the_video_group.videos.length >= 15)
			the_video_group.videos = new Array();
			
		$.each(response.items, function (i, item) {
			var this_video;
			if (videoController instanceof brightcoveVideoController)
				this_video = new video(item.id, item.name, item.shortDescription, item.linkURL, item.thumbnailURL);
			else if (videoController instanceof youtubeVideoController)
				this_video = new video(item.id.videoId, truncate(item.snippet.title, 50), truncate(item.snippet.description, 30), "" + YOUTUBE_PLAY_URL + item.id.videoId, item.snippet.thumbnails.medium.url);
			the_video_group.videos.push(this_video);
			//alert("videoController.videos[0].id: " + videoController.video_groups[0].videos[0].id);
			//alert("the_video_group.videos[" + i + "]: " + the_video_group.videos[i].name);

		});
		/*
		$.each(the_video_group.videos, function (i, item) {
			alert("the_video_group.videos[" + i + "]: " + the_video_group.videos[i].name);
		});		
		*/
		
		if (jqXHR.layout_videos)
			videoController.layoutVideos(jqXHR.is_landing_page, jqXHR.video_group_index);
	}
	
	videoController.prototype.layoutVideos = function (is_landing_page, video_group_index) {
		//alert("videoController.video_groups[0].videos[0].id: " + videoController.video_groups[0].videos[0].id);
		//alert("in layoutVideos()");

		var li_counter = 1;
		var more_column = DEFAULT_HOME_PAGE_COLUMN_SIZE;
		
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

		if (is_landing_page) {
			for (i = 0; i < 5; i++) {
				if (typeof videoController.video_groups[video_group_index].videos[i] != 'undefined') {
					//alert("videoController.video_groups[video_group_index].videos[" + i + "].name: " + videoController.video_groups[video_group_index].videos[i].name);
					//alert("li_counter: " + li_counter);
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ')').attr("id", videoController.video_groups[video_group_index].videos[i].id);
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ') img').attr("src", videoController.video_groups[video_group_index].videos[i].thumbnailURL);
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ') #title_isolated').html(videoController.video_groups[video_group_index].videos[i].name);
					if (videoController instanceof brightcoveVideoController)
						$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ') #desc_isolated').html(videoController.video_groups[video_group_index].videos[i].shortDescription);
					
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ')').show();
					li_counter++;
				} 
				else {
					//alert("videoController.video_groups[" + x + "].videos[" + i + "].id: " + videoController.video_groups[x].videos[i].id);
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ')').hide();
					li_counter++;
				}
			}
			
		}
		//not landing page 
		else {
			li_counter = 1;
			for (i = 0; i < DEFAULT_PAGE_SIZE; i++) {
				if (typeof videoController.video_groups[video_group_index].videos[i] != 'undefined') {
					//alert("videoController.video_groups[video_group_index].videos[" + i + "].name: " + videoController.video_groups[video_group_index].videos[i].name);
					//alert("li_counter: " + li_counter);
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ')').attr("id", videoController.video_groups[video_group_index].videos[i].id);
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ') img').attr("src", videoController.video_groups[video_group_index].videos[i].thumbnailURL);
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ') #title_isolated').html(videoController.video_groups[video_group_index].videos[i].name);
					if (videoController instanceof brightcoveVideoController)
						$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ') #desc_isolated').html(videoController.video_groups[video_group_index].videos[i].shortDescription);
					
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ')').show();

					li_counter++;
				}
				else {
					//alert("videoController.video_groups[" + x + "].videos[" + i + "].id: " + videoController.video_groups[x].videos[i].id);
					$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(li_counter) + ')').hide();
					li_counter++;
				}
				
			}
			//break;
		}
		
		alert("videoController.video_groups[video_group_index].videos.length: " + videoController.video_groups[video_group_index].videos.length);
		//as long as this is not the last page of results, display more
		$('#more_link_' + more_column + ' a').attr("class", video_group_index);
		//$('#more_link_' + more_column + ' a').attr("id", typeof videoController.video_groups[video_group_index].next_page == 'undefined' ? 0 : videoController.video_groups[video_group_index].next_page);
		$('#more_link_' + more_column + ' a').html("See more >").show();
		if (!is_landing_page) {
			$('#more_link_1 a').hide();
			$('#more_link_2 a').hide();
		}	
		
		//don't show more if last results page
		if ((videoController.video_groups[video_group_index].videos.length < DEFAULT_PAGE_SIZE))
			$('#more_link_3 a').hide();
			
			
		if (is_landing_page) 
			this.setFeatureVideoAndHeadings (true, video_group_index);
		else 
			this.setFeatureVideoAndHeadings (false, video_group_index);
	}
	
	
	
	function youtubeVideoController() { 
		
		//do we need video_group_index?
		this.setFeatureVideoAndHeadings = function (is_landing_page, video_group_index){ 
			//var the_video_group = this.video_groups;

			$( "#ytplayer" ).attr("src", "https://www.youtube.com/embed/" + this.video_groups[video_group_index].videos[0].id);

			
			//set feature videos in info box
			feature_video_id = this.video_groups[video_group_index].videos[0].id;
			feature_video_name = this.video_groups[video_group_index].videos[0].name;
			feature_video_desc = this.video_groups[video_group_index].videos[0].shortDescription;
			feature_video_url = this.video_groups[video_group_index].videos[0].linkURL;
			doInfoBox(feature_video_name, feature_video_desc,  feature_video_url, false);	
				
			if (is_landing_page) {
				//set column headings and subheads
				$('#head_col_1').html(this.video_groups[0].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + this.video_groups[0].subhead).show();
				$('#head_col_2').html(this.video_groups[1].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + this.video_groups[1].subhead).show();
				$('#head_col_3').html(this.video_groups[2].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + this.video_groups[2].subhead).show();
			} 
			else {
				//set column headings and subheads
				$('#head_col_1').html(this.video_groups[video_group_index].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + this.video_groups[video_group_index].subhead).show();
				$('#head_col_2').hide();
				$('#head_col_3').hide();

			}
			//alert("video_groups3[0].videos2: " + video_groups3[0].videos2);
		}




    	
    	this.video_groups = [
			new video_group("https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&channelId=UC4-hGd01KPF1i9xSWtox0JQ&maxResults=DEFAULT_PAGE_SIZE&q=mad%20men&key=AIzaSyDien4wrgW5R-Ewzq2hRxvoofMgTLVlFO8&alt=json","Mad Men", "Mad Men", "Jon Hamm Highlights"),
			new video_group("https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&channelId=UC4-hGd01KPF1i9xSWtox0JQ&maxResults=DEFAULT_PAGE_SIZE&q=community&key=AIzaSyDien4wrgW5R-Ewzq2hRxvoofMgTLVlFO8&alt=json","Community", "Community", "Community Highlights"), 
			new video_group("https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&channelId=UC4-hGd01KPF1i9xSWtox0JQ&maxResults=DEFAULT_PAGE_SIZE&q=paleyfest&key=AIzaSyDien4wrgW5R-Ewzq2hRxvoofMgTLVlFO8&alt=json","PaleyFest", "PaleyFest", "PaleyFest Highlights"), 
		];	
	

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
			var layout_videos = true;
			var is_landing_page = false;
		   //ajax_url = getAjaxURL(the_video_group_index);
			var the_ajax_url = getAjaxURL3(the_video_group_index,0,DEFAULT_PAGE_SIZE);
			//alert("the_ajax_url: " + the_ajax_url);
			$.ajax({
				type: "POST",
				dataType: "jsonp",
				contentType: "application/json",
				beforeSend  : function(XHR) {
					//XHR.selfDom = $(item);
					XHR.video_group_index = the_video_group_index;
            		XHR.layout_videos = layout_videos;
            		XHR.is_landing_page = is_landing_page;
			
			   },
				url: the_ajax_url,
				//async: false,
				
				//success: this.getYouTubeJson, 
				success: this.populateVideoGroupObjectWithVideos, 
				error: function(jqXHR, error, errorThrown) { 
					scrollToPlayer();
					$('#error_message').html("<p>Sorry, but you've encountered a hiccup. Please try again.</p>");
				}
				
			}); 
			
			//setFeatureVideoAndHeadings(false, the_video_group_index);
			//hide the extra videos	
			//for (x = DEFAULT_PAGE_SIZE; x > response.items.length; x--) {
				//$('.video_cols ul:nth-child(2) > li:nth-child(' + x + ')').hide();
			//}


			   
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
		
		this.handleMoreClick  = function handleMoreClick (event, ui){
			//alert("in handleMoreClick function");
			
			var the_video_group_index = $(event.target).closest("a").attr("class");
			var the_page_number = this.video_groups[the_video_group_index].next_page;
			alert("the_page_number: " + the_page_number);
			
			//var the_page_number = $(event.target).closest("a").attr("id");
			
			//alert("the_page_number from video_groups object: " + the_page_number);
			//alert("the_page_number from html class attr: " + $(event.target).closest("a").attr("class"));

			
			
			//more_link_id = "#" + event.target.parentNode.parentNode.id + ' a';			
			//new_page_number = ui.closest("a").attr("class"); 
			//ajax_url = getSearchAjaxURL(search_text, new_page_number); 	
			

			var layout_videos = true;
			var is_landing_page = false;
		   //ajax_url = getAjaxURL(the_video_group_index);
			var the_ajax_url = getAjaxURL3(the_video_group_index,the_page_number,DEFAULT_PAGE_SIZE);
			//alert("the_ajax_url: " + the_ajax_url);
			$.ajax({
				type: "POST",
				dataType: "jsonp",
				contentType: "application/json",
				beforeSend  : function(XHR) {
					//XHR.selfDom = $(item);
					XHR.video_group_index = the_video_group_index;
            		XHR.layout_videos = layout_videos;
            		XHR.is_landing_page = is_landing_page;
            		XHR.the_ajax_url = the_ajax_url;

			   },
				url: the_ajax_url,
				
				//success: this.getYouTubeJson, 
				success: this.populateVideoGroupObjectWithVideos, 
				error: function(jqXHR, error, errorThrown) { 
					scrollToPlayer();
					$('#error_message').html("<p>Sorry, but you've encountered a hiccup. Please try again.</p>");
				}
				
			}); 
			
		}		
		
		
		
		/*
		 var handleData = function (response, textStatus, jqXHR) {
			//alert("in handledata ");
    		//alert("data: " + data);
    		//alert("textStatus" + textStatus);
    		alert("jqXHR.video_group_index: " + jqXHR.video_group_index);
    		//do some stuff
    		
			//alert("response.selfData: " + response.selfData);
			//display videos and add them to videos array
			//set counter for column placement
			
			var group_counter = 1;
			if (jqXHR.video_group_index == 1)
				group_counter = 6;
			else if (jqXHR.video_group_index == 2)
				group_counter = 11;


			

			$.each(response.items, function (i, item) {
				//alert("response.items.length: " + response.items.length);
				//alert("item.id.videoId: " + item.id.videoId);
				//alert("item.snippet.title: " + item.snippet.title);
				//alert("item.snippet.description: " + item.snippet.description);
				//alert("item.snippet.link: " + "" + YOUTUBE_PLAY_URL + item.id.videoId);
				//alert("items loop i: " + i);
				//alert("videos_counter: " + videos_counter);
				var this_video = new video(item.id.videoId, truncate(item.snippet.title, 50), truncate(item.snippet.description, 30), "" + YOUTUBE_PLAY_URL + item.id.videoId, item.snippet.thumbnails.medium.url);
				video_groups3[jqXHR.video_group_index].videos2.push(this_video);
				
				


				$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(i+group_counter) + ')').attr("id", this_video.id).show();
				$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(i+group_counter) + ') img').attr("src", this_video.thumbnailURL).show();
				$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(i+group_counter) + ') #title_isolated').html(this_video.name).show();
				//$('.video_cols ul:nth-child(2) > li:nth-child(' + parseInt(i+group_counter) + ') #desc_isolated').html(this_video.shortDescription).show();

			

				//alert("video_groups3[" + videos_counter + "].videos2[" + i + "].id: " + video_groups3[videos_counter].videos2[i].id);

				//alert("Added this video to array " + videos_counter + ": " + response.items[i].snippet.title);							

			});
			
			//videos_counter++;
			//if it's landing page
			//if (group_counter > 6)
				setFeatureVideoAndHeadings(true, jqXHR.video_group_index);	    		
    		
    		
		} 
		*/



		this.getYouTubeJson = function getYouTubeJson (response) {
			alert("response.selfData: " + response.selfData);
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
				video_groups3[videos_counter].videos.push(this_video);
				
				


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
			//var the_page_size = is_landing_page ? 5 : DEFAULT_PAGE_SIZE;
			//alert("the_page_size: " + the_page_size);
			//var the_page_size = new Boolean(is_landing_page) ? 5 : DEFAULT_PAGE_SIZE;
			var layout_videos = false;
			var last_col = DEFAULT_HOME_PAGE_COLUMN_SIZE - 1;
			for (c = 0; c < this.video_groups.length; c++) {
				//alert("loop: " + c);
				//if last column on page
				//layout appropriate videos (first group or first 3 groups)
				if (c <= last_col) 
					layout_videos = true;
				else if (c > last_col)
					layout_videos = false;
				//var the_ajax_url = getAjaxURL3(c,0,the_page_size);
				var the_ajax_url = getAjaxURL3(c,0,DEFAULT_PAGE_SIZE);
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
					//async: false,
					beforeSend : function(XHR) {
            			XHR.video_group_index = c;
            			XHR.layout_videos = layout_videos;
            			XHR.is_landing_page = is_landing_page;
				   },
					success : this.populateVideoGroupObjectWithVideos,
					
					
					error: function(jqXHR, error, errorThrown) { 
						scrollToPlayer();
						$('#error_message').html("<p>Sorry, but you've encountered a hiccup. Please try again.</p>");
					}
					
				}); 				
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
	
		this.setFeatureVideoAndHeadings = function (is_landing_page, video_group_index){ 
			//var the_video_group = this.video_groups;
			//alert("in setFeatureVideoAndHeadings");
			
			//set feature videos in info box
			feature_video_id = this.video_groups[video_group_index].videos[0].id;
			feature_video_name = this.video_groups[video_group_index].videos[0].name;
			feature_video_desc = this.video_groups[video_group_index].videos[0].shortDescription;
			feature_video_url = this.video_groups[video_group_index].videos[0].linkURL;
			doInfoBox(feature_video_name, feature_video_desc,  feature_video_url, false);	
				
			if (is_landing_page) {
				//set column headings and subheads
				$('#head_col_1').html(this.video_groups[0].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + this.video_groups[0].subhead).show();
				$('#head_col_2').html(this.video_groups[1].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + this.video_groups[1].subhead).show();
				$('#head_col_3').html(this.video_groups[2].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + this.video_groups[2].subhead).show();
			} 
			else {
				//set column headings and subheads
				$('#head_col_1').html(this.video_groups[video_group_index].heading + "<br><span class='sr-desc' id='subhead_col_1'>" + this.video_groups[video_group_index].subhead).show();
				$('#head_col_2').hide();
				$('#head_col_3').hide();

			}
			//alert("video_groups3[0].videos2: " + video_groups3[0].videos2);
		}


		
		this.video_groups = [
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
			//var the_page_size = is_landing_page ? 5 : DEFAULT_PAGE_SIZE;
			//alert("the_page_size: " + the_page_size);
			//var the_page_size = new Boolean(is_landing_page) ? 5 : DEFAULT_PAGE_SIZE;
			var layout_videos = false;
			var last_col = DEFAULT_HOME_PAGE_COLUMN_SIZE - 1;
			for (c = 0; c < this.video_groups.length; c++) {
				//alert("loop: " + c);
				//if last column on page
				//if (c == last_col) 
					//layout_videos = true;
					
				//layout appropriate videos (first group or first 3 groups)
				if (c <= last_col) 
					layout_videos = true;
				else if (c > last_col)
					layout_videos = false;				
				//var the_ajax_url = getAjaxURL3(c,0,the_page_size);
				var the_ajax_url = getAjaxURL2(c,0,DEFAULT_PAGE_SIZE);
				/*
				$('#more_link_1 a').attr("id", the_video_group_index);
				$('#more_link_1 a').closest("span").attr("id", "" + "" + (parseInt(new_page_number) + parseInt(1)));
				$('#more_link_1 a').hide();	
				*/
				//alert("the_ajax_url: " + the_ajax_url);
				$.ajax({
					type: "POST",
					dataType: "json",
					contentType: "application/json",
					url: the_ajax_url,
					//async: false,
					beforeSend : function(XHR) {
            			XHR.video_group_index = c;
            			XHR.layout_videos = layout_videos;
            			XHR.is_landing_page = is_landing_page;
				   },
					success : this.populateVideoGroupObjectWithVideos,
					
					
					error: function(jqXHR, error, errorThrown) { 
						scrollToPlayer();
						$('#error_message').html("<p>Sorry, but you've encountered a hiccup. Please try again.</p>");
					}
					
				}); 				
			}
		}
		
		this.handleMenuClick  = function handleMenuClick (event, ui){
			//alert("in handleMenuClick");
			var the_video_group_index;
			$.each(ui, function (i, item) {
			   the_video_group_index = item.find(".get_video_group").attr("id");
			});
			var layout_videos = true;
			var is_landing_page = false;
		   //ajax_url = getAjaxURL(the_video_group_index);
			var the_ajax_url = getAjaxURL2(the_video_group_index,0,DEFAULT_PAGE_SIZE);
			//alert("the_ajax_url: " + the_ajax_url);
			$.ajax({
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				beforeSend  : function(XHR) {
					//XHR.selfDom = $(item);
					XHR.video_group_index = the_video_group_index;
            		XHR.layout_videos = layout_videos;
            		XHR.is_landing_page = is_landing_page;

			   },
				url: the_ajax_url,
				
				//success: this.getYouTubeJson, 
				success: this.populateVideoGroupObjectWithVideos, 
				error: function(jqXHR, error, errorThrown) { 
					scrollToPlayer();
					$('#error_message').html("<p>Sorry, but you've encountered a hiccup. Please try again.</p>");
				}
				
			}); 
		}		
		
		
		this.handleMoreClick  = function handleMoreClick (event, ui){
			//alert("in handleMoreClick function");
			
			var the_video_group_index = $(event.target).closest("a").attr("class");
			var the_page_number = this.video_groups[the_video_group_index].next_page;
			
			//var the_page_number = $(event.target).closest("a").attr("id");
			
			//alert("the_page_number from video_groups object: " + the_page_number);
			//alert("the_page_number from html class attr: " + $(event.target).closest("a").attr("class"));

			
			
			//more_link_id = "#" + event.target.parentNode.parentNode.id + ' a';			
			//new_page_number = ui.closest("a").attr("class"); 
			//ajax_url = getSearchAjaxURL(search_text, new_page_number); 	
			

			var layout_videos = true;
			var is_landing_page = false;
		   //ajax_url = getAjaxURL(the_video_group_index);
			var the_ajax_url = getAjaxURL2(the_video_group_index,the_page_number,DEFAULT_PAGE_SIZE);
			//alert("the_ajax_url: " + the_ajax_url);
			$.ajax({
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				beforeSend  : function(XHR) {
					//XHR.selfDom = $(item);
					XHR.video_group_index = the_video_group_index;
            		XHR.layout_videos = layout_videos;
            		XHR.is_landing_page = is_landing_page;
            		XHR.the_ajax_url = the_ajax_url;

			   },
				url: the_ajax_url,
				
				//success: this.getYouTubeJson, 
				success: this.populateVideoGroupObjectWithVideos, 
				error: function(jqXHR, error, errorThrown) { 
					scrollToPlayer();
					$('#error_message').html("<p>Sorry, but you've encountered a hiccup. Please try again.</p>");
				}
				
			}); 
			
		}		
		
		

		/*
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
						/*
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
			*/ /*
		}	
		*/	
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
		//var ajax_url = videoController.video_groups2[the_video_group_index].json_call.replace("DEFAULT_PAGE_SIZE", the_page_size);
		var ajax_url = videoController.video_groups[the_video_group_index].json_call.replace("DEFAULT_PAGE_SIZE", the_page_size);
		
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
		//alert("ajax_url: " + ajax_url);
		return ajax_url;
	}
	
	
	function getAjaxURL3(the_video_group_index, new_page_number, page_size) {
		alert("new_page_number: " + new_page_number);
		var the_page_size = (page_size != DEFAULT_PAGE_SIZE) ? page_size : DEFAULT_PAGE_SIZE;
		//var the_page_size = 5;
		//alert("the_page_size: " + the_page_size);
		var ajax_url = videoController.video_groups[the_video_group_index].json_call.replace("DEFAULT_PAGE_SIZE", the_page_size);
		//var ajax_url = ajax_url_pre.replace("PAGE_TOKEN", new_page_number);

		/*
		var split_url = ajax_url.split("&");

		$.each(split_url, function (i, item) { //page_number = 1, page_size = 1, serach = true
			//how to break out early?
			if (split_url[i].indexOf("pageToken") != -1) {
				var split_param = split_url[i].split("="); //page_number, 0
				if (new_page_number != 0) {
					//alert("matched pageToken");
					split_url[i] = "https://www.googleapis.com/youtube/v3/search?pageToken=" + new_page_number;
					ajax_url = split_url.join("&");
				}
			}
		});
		*/
		
		if (new_page_number != 0) 
			ajax_url += "&pageToken=" + new_page_number;
		
		alert("ajax_url: " + ajax_url);
		
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
			
			
		
		//for (x=0;x<the_video_group.length;x++) {
		for (x=0;x<videoController.video_groups.length;x++) {

			//alert("x: " + x);	
			$.each(videoController.video_groups[x].videos, function (i, item) {
				if (videoController.video_groups[x].videos[i].id == the_video_id) {
					videoController.playTitle(videoController.video_groups[x].videos[i].id, videoController.video_groups[x].videos[i].name, videoController.video_groups[x].videos[i].shortDescription, videoController.video_groups[x].videos[i].linkURL);
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
	/*
	$(".more a").click(loadVideoPrep);	
	*/
	
	$(".more a").on( "click", function( event, ui ) { 
		//alert("in menu select");
		event.preventDefault();
		videoController.handleMoreClick (event, ui);
	});
	
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



