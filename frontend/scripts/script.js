const slider = document.getElementById('slider');
let currentIndex = 0;

function slideLeft() {
    currentIndex = Math.max(currentIndex - 1, 0);  // Prevent sliding beyond the first image
    updateSlider();
}

function slideRight() {
    const maxIndex = Math.ceil(slider.children.length / 2) - 1;
    currentIndex = Math.min(currentIndex + 1, maxIndex);  // Prevent sliding beyond the last pair of images
    updateSlider();
}

function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}