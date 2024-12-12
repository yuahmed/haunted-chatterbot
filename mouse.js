// MOUSE CHASER
//set up to appear after unpacking
// separate from haunted effects
const imagePaths = [
  "./assets/img/AM.png",
  "./assets/img/EL.png",
  "./assets/img/IA.png",
  "./assets/img/EA.png",
  "./assets/img/RH.png",
  "./assets/img/ART.png",
];

//tracking current image stats
let currentImageIndex = 0;
let currentImageElement = null;

//follows cursor on page
function getMouseCoords(e) {
  var e = e || window.event;
  if (currentImageElement) {
    // centering image
    currentImageElement.style.left =
      e.clientX - currentImageElement.width / 2 + window.scrollX + "px";
    currentImageElement.style.top =
      e.clientY - currentImageElement.height / 2 + window.scrollY + "px";
  }
}

// create and siplay image div
function showNextImage() {
  currentImageElement = document.createElement("img");
  currentImageElement.src = imagePaths[currentImageIndex];
  currentImageElement.style.position = "absolute";
  currentImageElement.style.margin = "0";
  currentImageElement.style.padding = "0";
  currentImageElement.style.pointerEvents = "none";

  // IMAGE SIZING
  currentImageElement.style.width = "30px";
  currentImageElement.style.height = "30px";

  document.body.appendChild(currentImageElement);
  document.body.onmousemove = getMouseCoords;

  setTimeout(() => {
    // reset current stats
    currentImageElement.remove();
    currentImageElement = null;
  }, 5000);

  // update
  //wrapping for iterating twice
  currentImageIndex = (currentImageIndex + 1) % imagePaths.length;
}

// start showing images
//RECURSIVE
window.startImageSequence = function () {
  function cycleImages() {
    showNextImage();

    // restarting images after 20s delay
    if (currentImageIndex === 0) {
      setTimeout(() => {
        cycleImages();
      }, 20000);
    // showing next image after 7secs
    } else {
      setTimeout(cycleImages, 7000);
    }
  }

  //initiate cycle
  cycleImages();
};
