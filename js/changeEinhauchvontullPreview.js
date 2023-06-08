function displayNextImage() {
    x = (x === einhauchvontullImages.length - 1) ? 0 : x + 1;
    document.getElementById("einhauchvontullPreview").src = einhauchvontullImages[x];
}

function displayPreviousImage() {
    x = (x <= 0) ? einhauchvontullImages.length - 1 : x - 1;
    document.getElementById("einhauchvontullPreview").src = einhauchvontullImages[x];
}

function startTimer() {
    setInterval(displayNextImage, 2000);
}

var einhauchvontullImages = [], x = -1;

einhauchvontullImages[0] = "../projects/einHauchVonTull/media/tull7_preview.jpg";
einhauchvontullImages[1] = "../projects/einHauchVonTull/media/tull5_preview.jpg";
einhauchvontullImages[2] = "../projects/einHauchVonTull/media/tull1_preview.jpg";

startTimer();