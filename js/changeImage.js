function displayNextImage() {
    x = (x === images.length - 1) ? 0 : x + 1;
    document.getElementById("logoPic").src = images[x];
}

function displayPreviousImage() {
    x = (x <= 0) ? images.length - 1 : x - 1;
    document.getElementById("logoPic").src = images[x];
}

function startTimer() {
    setInterval(displayNextImage, 2000);
}

var images = [], x = -1;

images[0] = "../projects/einHauchVonTull/media/tull7_slim.jpg";
images[1] = "../projects/einHauchVonTull/media/tull5_slim.jpg";
images[2] = "../projects/einHauchVonTull/media/tull1_slim.jpg";

startTimer();