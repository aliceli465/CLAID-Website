var imageFolder = "/images/events/";

// Place the image in the /images/events/ then just add the file name inside var imageFiles
var imageFiles = [
    "chinese corner.jpg",
    "performance branch.png",
    "lantern2.jpg",
    "performance.png",
    "peeeeeza.png",
];
    
// Generate carousel indicators and items
var carouselIndicators = document.querySelector("#aboutUsCarousel .carousel-indicators");
var carouselInner = document.querySelector("#aboutUsCarousel .carousel-inner");
    
imageFiles.forEach(function(fileName, index) {
    // Create carousel indicator
    var indicator = document.createElement("li");
    indicator.setAttribute("data-target", "#aboutUsCarousel");
    indicator.setAttribute("data-slide-to", index.toString());
    if (index === 0) {
      indicator.classList.add("active");
    }
    carouselIndicators.appendChild(indicator);

    // Create carousel item
    var item = document.createElement("div");
    item.classList.add("carousel-item");
    if (index === 0) {
      item.classList.add("active");
    }
    var image = document.createElement("img");
    image.classList.add("d-block", "w-100");
    image.style.maxHeight = "500px";
    image.style.width = "auto";
    image.style.objectFit = "cover";
    image.src = imageFolder + fileName;
    image.alt = "Slide " + (index + 1).toString();
    item.appendChild(image);
    carouselInner.appendChild(item);
});