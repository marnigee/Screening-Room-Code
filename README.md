Screening-Room-Code
===================

Object-Oriented Javascript Screening Room supporting Brightcove, YouTube and other video hosts with REST APIs.

The scope of theis project was to write a screening room that embeds thrid-party videos onto a web page, incorporating search and pagination functionality. With scaleability and resusable code in mind, I used an MVC (Model View Controller) design pattern. The program creates Video, VideoGroup, and PageOfVideo objects from json AJAX calls (the Model); the VideoController object holds the business logic (the Controller), and the HTML and CSS files cover the presentation layer (the View). I also incorporated an OOP approach so that the base functionality is in the parent VideoController object, which the more specific objects like BrightcoveVideoController and YouTubeVideoController inherit. 

The script is screening-room-3-2.html. 

The following URLs are working examples of this code:
http://paley.me/brightcove-sr
http://paley.me/brightcove-sr

They use identical code bases except for this one line that defines the type of VideoController object: 

	/**
	* declare and initialize the VideoController 
	**/	
	var videoController = new BrightcoveVideoController();




