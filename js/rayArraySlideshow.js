var rayArraySlideshow = {

	displayNextImage: function () {
		slide = (slide === rayarrayImages.length - 1) ? 0 : slide + 1;
		document.getElementById("rayarrayPreview").src = rayarrayImages[slide];
		console.log("rayArray: " + slide);
	},
	
	startTimer: function () {
		setInterval(this.displayNextImage, 3000);
	}
}

var slide = -1;
var rayarrayImages = [];

rayarrayImages[0] = "../projects/rayArray/media/preview1.jpg";
rayarrayImages[1] = "../projects/rayArray/media/preview2.jpg";
rayarrayImages[2] = "../projects/rayArray/media/preview3.jpg";
rayarrayImages[3] = "../projects/rayArray/media/preview4.jpg";
rayarrayImages[4] = "../projects/rayArray/media/preview5.jpg";

rayArraySlideshow.startTimer();