// Get the canvas element from the DOM
const canvas = document.getElementById('scene');

// Get the canvas dimensions
let width = canvas.offsetWidth; // Width of the scene
let height = canvas.offsetHeight; // Height of the scene

// Function called right after user resized its screen
function onResize() {
    // We need to define the dimensions of the canvas to our canvas element
    // Javascript doesn't know the computed dimensions from CSS so we need to do it manually
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;

    // If the screen device has a pixel ratio over 1
    // We render the canvas twice bigger to make it sharper (e.g. Retina iPhone)
    if (window.devicePixelRatio > 1) {
        canvas.width = canvas.clientWidth * 2;
        canvas.height = canvas.clientHeight * 2;
        ctx.scale(2, 2);
    } else {
        canvas.width = width;
        canvas.height = height;
    }
}

// Listen to resize events
window.addEventListener('resize', onResize);
// Make sure the canvas size is perfect
onResize();