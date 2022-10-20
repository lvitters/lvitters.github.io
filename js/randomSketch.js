function randomSketch() {
    var urls = new Array();

    urls[0] = "../../visuals/blob/index.html";
    urls[1] = "../../visuals/emergence/index.html";
    urls[2] = "../../visuals/carpet/index.html"
    urls[3] = "../../visuals/supernova/index.html";
    //urls[4] = "../../visuals/doubleVortex/index.html";

    var random = Math.floor(Math.random() * urls.length);

    console.log(urls[random]);

    window.location.href = urls[random];
}