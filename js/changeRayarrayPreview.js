function displayNextImage() {
    x = (x === rayarrayImages.length - 1) ? 0 : x + 1;
    document.getElementById("rayarrayPreview").src = rayarrayImages[x];
}

function displayPreviousImage() {
    x = (x <= 0) ? rayarrayImages.length - 1 : x - 1;
    document.getElementById("rayarrayPreview").src = rayarrayImages[x];
}

function startTimer() {
    setInterval(displayNextImage, 2000);
}

var rayarrayImages = [], x = -1;

rayarrayImages[0] = "../projects/rayArray/media/preview1.jpg";
rayarrayImages[1] = "../projects/rayArray/media/preview2.jpg";
rayarrayImages[2] = "../projects/rayArray/media/preview3.jpg";
rayarrayImages[3] = "../projects/rayArray/media/preview4.jpg";
rayarrayImages[4] = "../projects/rayArray/media/preview5.jpg";

startTimer();