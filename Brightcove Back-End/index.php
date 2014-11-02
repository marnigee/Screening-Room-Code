
	<?php
		require('bc-mapi.php');
		require('ds-search.php');
	
		$default_sort = 'PUBLISH_DATE:DESC';
		$default_video_fields = 'id,name,shortDescription,tags,linkURL,thumbnailURL,playsTotal,playsTrailingWeek';
		$default_page_size = NULL;
		$default_page_number = NULL;
		
		$search_all = "";
		$search_any = "";
		$search_none = "";
		
		//return single video using find_video_by_id
		if($_GET['find_video_by_id'] != ""){
			$the_video_id = (isset($_GET['video_id']) && strlen($_GET['video_id']) > 0) ?  $_GET['video_id'] : "";
			$videoResultSingle = getSingleVideo($bc, $_GET['video_id']);
			if($_GET['callback'] != "")
				returnVideoResults(array($videoResultSingle), $_GET['callback'], $bc);
		}
		
		//return video search results using search_video
		if(isset($_GET['search'])){
			$parsed_string = str_replace("%20" , " " , $_SERVER['QUERY_STRING']);
			$output = parse_str_ext($parsed_string);
			
			//separate out the search terms into all, any, and none
			foreach($output as $k => $v) {
    			if ($k == "all") 
					$search_all = setSearchTerms($search_all, $v);
    			if ($k == "any")
					$search_any = setSearchTerms($search_any, $v);
				if ($k == "none")
					$search_none = setSearchTerms($search_none, $v);
			}

			$params = array(
    			'video_fields' => (isset($_GET['video_fields']) && strlen($_GET['video_fields']) > 0) ?  $_GET['video_fields'] : $default_video_fields,
    			'page_size' => (isset($_GET['page_size']) && strlen($_GET['page_size']) > 0) ? $_GET['page_size'] : $default_page_size ,
    			'page_number' => (isset($_GET['page_number']) && strlen($_GET['page_number'] > 0)) ? $_GET['page_number'] : $default_page_number,
				'sort_by' => (isset($_GET['sort_by']) && strlen($_GET['sort_by']) > 0) ?  $_GET['sort_by'] : $default_sort
			);

			// Set our search terms
			$terms = array(
    			'all' => $search_all,
				'any' => $search_any,
    			'none' => $search_none
			);
			
			$videoResults = getSearchVideos($bc, $terms, $params);
			
			if(isset($_GET['callback']) && $_GET['callback'] != "")
				returnVideoResults($videoResults, $_GET['callback'],$bc);
		}
		
		
		//set the individual search parameter string (all, any, or none)
		function setSearchTerms($the_search_term, $the_v) {
			if (is_array($the_v)) {
				foreach ($the_v as $value) { 
					$the_search_term .= $value . ',';
				}
			} else {
				$the_search_term .= $the_v . ',';
			}
			return $the_search_term;
		}
		
		//parses the query string so that duplicate parameter name values get returned as arrays	
		function parse_str_ext($toparse) {
			$returnarray = array();
			$keyvaluepairs = split("&", $toparse);
			foreach($keyvaluepairs as $pairval) {
				$splitpair = split("=", $pairval);
					if(!array_key_exists($splitpair[0], $returnarray)) 
						$returnarray[$splitpair[0]] = array();
				$returnarray[$splitpair[0]][] = $splitpair[1];
			}
			return $returnarray;   
		}


?>