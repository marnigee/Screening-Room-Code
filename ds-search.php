<?php
// Secure the token
$bc = new BCMAPI(BRIGHTCOVE_TOKEN_HERE);

//get video results by search_video method
function getSearchVideos($bc, $terms, $params){
	try {
		$videos = $bc->search('video', $terms, $params);
		return $videos;
	} catch(Exception $error) {
		echo $error;
		die();
	}
}

//get video results by find_video_by_id method
function getSingleVideo($bc, $videoID){
	try {
		$video = $bc->find('videobyid', $videoID);
		return $video;
	} catch(Exception $error) {
		echo $error;
		die();
	}
}

//return JSON data
function returnVideoResults($data=array(), $theCallback, $bc){
	$full_data = array();
	$full_data['items'] = $data;
	$full_data['bc'] = $bc;
	echo json_encode($full_data);
}

?>