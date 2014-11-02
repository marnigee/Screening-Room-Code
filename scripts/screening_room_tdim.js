//brightcove vars
var player;
var modVP;
var modExp;
var modCon;
var social;

//video object
function video(id,name,shortDescription,linkURL, thumbnailURL, longDescription)
{
	this.id=id;
	this.name=name;
	this.shortDescription=shortDescription;
	this.linkURL=linkURL;
	this.thumbnailURL=thumbnailURL;
	this.longDescription=longDescription;
}

//array of video objects
var videos = new Array();

//video_group object
function video_group(json_call,menu_text,heading,subhead)
{
	this.json_call=json_call;
	this.menu_text=menu_text;
	this.heading=heading;
	this.subhead=subhead;
}

var DEFAULT_PAGE_SIZE = 15;
var DEFAULT_OPENING_PAGE_SIZE = 5;
var DEFAULT_VIDEO_GROUP_INDEX = 0;

//array of video_group objects
var video_groups = [
	new video_group("http://www.paleycenter.org/brightcove/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:this%20day%20in%20media&all=tag:feature&sort_by=MODIFIED_DATE:DESC&video_fields=id,name,shortDescription,longDescription,linkURL,thumbnailURL&callback=video","Featured", "Featured", "Commemorating key dates in media history"),
	new video_group("http://www.paleycenter.org/brightcove/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:this%20day%20in%20media&all=tag:January&sort_by=MODIFIED_DATE:DESC&video_fields=id,name,shortDescription,longDescription,linkURL,thumbnailURL&callback=video","January", "January", "Commemorating key dates in media history                              "),
	new video_group("http://www.paleycenter.org/brightcove/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:this%20day%20in%20media&all=tag:February&sort_by=MODIFIED_DATE:DESC&video_fields=id,name,shortDescription,longDescription,linkURL,thumbnailURL&callback=video","February", "February", "Commemorating key dates in media history"), 
	new video_group("http://www.paleycenter.org/brightcove/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:this%20day%20in%20media&all=tag:March&video_fields=id,name,shortDescription,longDescription,linkURL,thumbnailURL&callback=video","March", "March", "Commemorating key dates in media history"), 
	new video_group("http://www.paleycenter.org/brightcove/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:this%20day%20in%20media&all=tag:April&video_fields=id,name,shortDescription,longDescription,linkURL,thumbnailURL&callback=video","April", "April", "Commemorating key dates in media history"), 
	new video_group("http://www.paleycenter.org/brightcove/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:this%20day%20in%20media&all=tag:May&video_fields=id,name,shortDescription,longDescription,linkURL,thumbnailURL&callback=video","May", "May", "Commemorating key dates in media history"), 
	new video_group("http://www.paleycenter.org/brightcove/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:this%20day%20in%20media&all=tag:June&video_fields=id,name,shortDescription,longDescription,linkURL,thumbnailURL&callback=video","June", "June", "Commemorating key dates in media history"), 
	new video_group("http://www.paleycenter.org/brightcove/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:this%20day%20in%20media&all=tag:July&video_fields=id,name,shortDescription,longDescription,linkURL,thumbnailURL&callback=video","July", "July", "Commemorating key dates in media history"), 
	new video_group("http://www.paleycenter.org/brightcove/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:this%20day%20in%20media&all=tag:August&video_fields=id,name,shortDescription,longDescription,linkURL,thumbnailURL&callback=video","August", "August", "Commemorating key dates in media history"), 
	new video_group("http://www.paleycenter.org/brightcove/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:this%20day%20in%20media&all=tag:September&video_fields=id,name,shortDescription,longDescription,linkURL,thumbnailURL&callback=video","September", "September", "Commemorating key dates in media history"), 
	new video_group("http://www.paleycenter.org/brightcove/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:this%20day%20in%20media&all=tag:October&video_fields=id,name,shortDescription,longDescription,linkURL,thumbnailURL&callback=video","October", "October", "Commemorating key dates in media history"), 
	new video_group("http://www.paleycenter.org/brightcove/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:this%20day%20in%20media&all=tag:November&video_fields=id,name,shortDescription,longDescription,linkURL,thumbnailURL&callback=video","November", "November", "Commemorating key dates in media history"), 
	new video_group("http://www.paleycenter.org/brightcove/videos/index.php?search=true&page_size=DEFAULT_PAGE_SIZE&page_number=0&all=tag:this%20day%20in%20media&all=tag:December&video_fields=id,name,shortDescription,longDescription,linkURL,thumbnailURL&callback=video","December", "December", "Commemorating key dates in media history")
];

//for search
var SEARCH_TOKEN = "SEARCH_TOKEN";
var search_page_number = 0;
var SEARCH_PAGE_NUMBER_TOKEN = "SEARCH_PAGE_NUMBER_TOKEN";
var search_ajax_with_token = "http://www.paleycenter.org/brightcove/videos/index.php?search=true&page_size=" + DEFAULT_PAGE_SIZE + "&page_number=SEARCH_PAGE_NUMBER_TOKEN&all=tag:this%20day%20in%20media&all=search_text:" + SEARCH_TOKEN + "&video_fields=id,name,shortDescription,longDescription,thumbnailURL,linkURL&callback=video";
var search_text = "";

//for featured video
var feature_video_id;
var feature_video_name;
var feature_video_desc;
var feature_video_url;
var feature_video_long_desc;
var cat_page = false;

//for prepopulating names list for autocomplete search box
var prepopulate_page_number = 0;
var PREPOPULATE_PAGE_NUMBER_TOKEN = "PREPOPULATE_PAGE_NUMBER_TOKEN";
var ajax_video_prepopulate = "http://www.paleycenter.org/brightcove/videos/index.php?search=true&page_number=PREPOPULATE_PAGE_NUMBER_TOKEN&all=tag:this%20day%20in%20media&callback=video";
var names_autocomplete = new Array();

//ajax call for getting a single video by id
var VIDEO_ID_TOKEN = "VIDEO_ID_TOKEN";
var ajax_feature_video_prepopulate = "http://www.paleycenter.org/brightcove/videos/index.php?find_video_by_id=true&video_id=VIDEO_ID_TOKEN&video_fields=id,name,shortDescription,longDescription,thumbnailURL,linkURL&callback=video";
var incoming_feature_video = false;


//ajax calls for opening 3-single-column page
var opening_ajax_url_1;
var opening_ajax_url_2;
var opening_ajax_url_3;

	
$(document).ready(function() {	

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
						if (item.toUpperCase() === "THIS DAY IN MEDIA") {
							incoming_feature_video = true;
							//cat_page = false;
							var this_video = new video(response.items[0].id, response.items[0].name, response.items[0].shortDescription, response.items[0].linkURL, response.items[0].thumbnailURL, response.items[0].longDescription);
							videos.push(this_video);
							
							//set it as the featured video
							feature_video_id = response.items[0].id;
							feature_video_name = response.items[0].name;
							feature_video_desc = response.items[0].shortDescription;
							feature_video_url = response.items[0].linkURL;	
							feature_video_long_desc = response.items[0].longDescription;
						}
	
					});					
				}
				else {
					feature_video_id = "";
					feature_video_name = "";
					feature_video_desc = "";
					feature_video_url = "";
					feature_video_long_desc = "";
				}
			},
			error: function(jqXHR, error, errorThrown) { 
				scrollToPlayer();
				$('#error_message').html("<p>Sorry, but the screening room is not working properly at the moment. Please try again later.</p>");
          	}

		}); 
	}

	/**
	* Gets all names of possible video titles for search box autocomplete
	* 
	**/
	function getAutocompleteVideoNames() {
		ajax_names = ajax_video_prepopulate.replace("PREPOPULATE_PAGE_NUMBER_TOKEN", prepopulate_page_number);
		$.ajax({
			type: "POST",
			dataType: "json",
			contentType: "application/json",
			url: ajax_names,
			success: function (response) {
				$.each(response.items, function (i, item) {
					names_autocomplete.push(response.items[i].name);
				});
				var page_size_number = parseInt(response.bc.page_number+1);
				if ((response.bc.total_count/response.bc.page_size) > page_size_number) {
					prepopulate_page_number++;
					getAutocompleteVideoNames(); //call recursively
				} 
			},

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
			//responseFn(a);
			responseFn(a.slice(0, 20));
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
	$(".video_col a").click(function(event) {
		event.preventDefault();
		var the_video_id = $(this).attr("id");
		$.each(videos, function (i, item) {
			if (videos[i].id == the_video_id) {
				//alert("long desc: " + videos[i].longDescription);
				playTitle(videos[i].id, videos[i].name, videos[i].shortDescription, videos[i].longDescription, videos[i].linkURL);
				return false;
			}	
		});	
	}); //end click function
		
	
	/**
	* Sets the left navigation menu items
	* 
	**/	
	$(function() {
		$.each( video_groups, function( index, value ) {
			if (video_groups[index].menu_text.length > 0)
				$("#menu").append("<li id='sr-menu'><a style='z-index:10000;' class='get_video_group' id = " + index + " href=''>" + video_groups[index].menu_text + "</a></li>");
		});
		$( "#menu" ).menu();
	});

	/**
	* Handles 3 major types of user interactions:
	*	1) Menu
	*	2) Search
	*	3) More Results ("see more")
	* 
	**/
	//menu clicks
	$("#menu").on( "menuselect", function( event, ui ) { loadVideoPrep (event, ui); } );
	
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
				//display videos and add them to vidoes array
				$.each(response.items, function (i, item) {
					if (((is_loading_page && col_number == 2) && (i == 0) && (!incoming_feature_video)) || cat_page) {
						//set first video as feature video to cue in player only once on page load and set column heading
						if (!incoming_feature_video) {
							feature_video_id = response.items[i].id;
							feature_video_name = response.items[i].name;
							feature_video_desc = response.items[i].shortDescription;
							feature_video_url = response.items[i].linkURL;
							feature_video_long_desc = response.items[i].longDescription;
							//alert("long_desc: " + response.items[i].longDescription);
							cat_page = false;
						}
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
						var this_video = new video(response.items[i].id, response.items[i].name, response.items[i].shortDescription, response.items[i].linkURL, response.items[i].thumbnailURL, response.items[i].longDescription);
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

	function playTitle(videoId, name, desc, long_desc, link) {
		doInfoBox(name, desc, long_desc, link, true);
			modVP.loadVideoByID(videoId);
	} 
	
	/**
	* Trigger initial page load (gets the video names list for search autocomplete and loads videos)
	*	
	* 
	**/	
	getAutocompleteVideoNames();
	
	//set ajax calls for opening 3-single-columns page
	//opening_ajax_url_1 = video_groups[0].json_call.replace("DEFAULT_PAGE_SIZE", DEFAULT_OPENING_PAGE_SIZE);
	//opening_ajax_url_2 = video_groups[1].json_call.replace("DEFAULT_PAGE_SIZE", DEFAULT_OPENING_PAGE_SIZE);
	//opening_ajax_url_3 = video_groups[8].json_call.replace("DEFAULT_PAGE_SIZE", DEFAULT_OPENING_PAGE_SIZE);
	
	//loadVideos(opening_ajax_url_1, 0, 1, true, false, "#more_link_1 a");
	//if (!incoming_feature_video)
	cat_page = true;
	loadVideos(getAjaxURL(0), 0, 1, false, false, "#more_link_1 a");
	
}); //end ready function	
	

function onTemplateReady(event) {
		player = brightcove.api.getExperience($('#myExperience').attr("id"));
		modVP = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
		
		//set up feature video
		modVP.cueVideoByID(feature_video_id);
		doInfoBox(feature_video_name, feature_video_desc, feature_video_long_desc,  feature_video_url, false);

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

function doInfoBox(title, desc, long_desc, link, do_scroll) {
	
	if (do_scroll)
		scrollToPlayer();
	var the_link = "";
	var the_title = "";
	var the_desc = "";
	var the_long_desc = "";
	if ((link) && link.length > 0)
		the_link = '<a target="_blank" href=' + link +'>More Info</a>';
	if ((title) && title.length > 0)
		the_title = 'You\'re watching <b>' + title;
	if ((desc) && desc.length > 0)
		the_desc = desc;
	if ((long_desc) && long_desc.length > 0)
		the_long_desc = long_desc;
	var info_box = document.getElementById("video_info");
	info_box.innerHTML = '<div style="margin:10px;">' + the_title + '</b><br>' + the_desc + '<br>' + the_long_desc + '&nbsp;&nbsp;' + the_link + '</div>';
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}
