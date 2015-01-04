Screening Room Project
===================

The scope of this project was to write a mobile-friendly Javascript screening room that embeds thrid-party videos incorporating search and pagination functionality. The following URLs are working examples of this code:

http://media.paleycenter.org/wp-content/misc/videos/screening-room-youtube.html
	
http://media.paleycenter.org/wp-content/misc/videos/screening-room-brightcove.html

With scaleability and resusable code in mind, I used an MVC (Model View Controller) design pattern: Video, VideoGroup, and PageOfVideo objects serve as the Model and are built from json AJAX calls; the VideoController object serves as the Controller with all the business logic; and the HTML and CSS files serve as the View covering the presentation layer. I also incorporated an OOP approach using Javascript prototypes so that the base functionality is in the parent VideoController object. The more specific BrightcoveVideoController and YouTubeVideoController objects inherit that common base functionality. Please see the class design diagram for more details: http://media.paleycenter.org/wp-content/misc/videos/ScreeningRoomClassDiagram.pdf.  

The scripts are screening-room-youtube.js and screening-room-brightcove.js, and they are identical except for this one line that defines the type of VideoController object: 

	/**
	* declare and initialize the VideoController 
	**/	
	var videoController = new BrightcoveVideoController();
	OR
	var videoController = new YouTubeVideoController();




