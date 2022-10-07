function displayNextImage() {
    x = (x === images.length - 1) ? 0 : x + 1;
    document.getElementById("changingPic").src = images[x];
}

function displayPreviousImage() {
    x = (x <= 0) ? images.length - 1 : x - 1;
    document.getElementById("changingPic").src = images[x];
}

function startTimer() {
    setInterval(displayNextImage, 1600);
}

var images = [], x = -1;

images[0] = "../einHauchVonTull_v2/media/tull10.jpg";
images[1] = "../einHauchVonTull_v2/media/tull11.jpg";
images[2] = "../einHauchVonTull_v2/media/tull12.jpg";
images[3] = "../einHauchVonTull_v2/media/tull13.jpg";

startTimer();