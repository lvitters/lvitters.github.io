var einhauchvontullSlideshow = {

	displayNextImage: function () {
		slideTull = (slideTull === einhauchvontullImages.length - 1) ? 0 : slideTull + 1;
		document.getElementById("einhauchvontullPreview").src = einhauchvontullImages[slideTull];
		console.log("tull: " + slideTull);
	},
	
	startTimer: function () {
		setInterval(this.displayNextImage, 3000);
	}
}

var slideTull = -1;
var einhauchvontullImages = [];

einhauchvontullImages[0] = "../projects/einHauchVonTull/media/tull7_preview.jpg";
einhauchvontullImages[1] = "../projects/einHauchVonTull/media/tull5_preview.jpg";
einhauchvontullImages[2] = "../projects/einHauchVonTull/media/tull1_preview.jpg";
einhauchvontullImages[3] = "../projects/einHauchVonTull/media/tull6_preview.jpg";

einhauchvontullSlideshow.startTimer();