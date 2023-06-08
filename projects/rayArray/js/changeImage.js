function displayNextImage() {
    x = (x === images.length - 1) ? 0 : x + 1;
    document.getElementById("changingPic").src = images[x];
}

function displayPreviousImage() {
    x = (x <= 0) ? images.length - 1 : x - 1;
    document.getElementById("changingPic").src = images[x];
}

function startTimer() {
    setInterval(displayNextImage, 2000);
}

var images = [], x = -1;

images[0] = "../rayArray/media/preview1.jpg";
images[1] = "../rayArray/media/preview2.jpg";
images[2] = "../rayArray/media/preview3.jpg";
images[3] = "../rayArray/media/preview4.jpg";
images[4] = "../rayArray/media/preview5.jpg";

startTimer();