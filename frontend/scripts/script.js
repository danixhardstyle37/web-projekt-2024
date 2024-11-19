const slider = document.getElementById('slider');
let currentIndex = 0;

function slideLeft() {
    currentIndex = Math.max(currentIndex - 1, 0);  
    updateSlider();
}

function slideRight() {
    const maxIndex = Math.ceil(slider.children.length / 2) - 1;
    currentIndex = Math.min(currentIndex + 1, maxIndex); 
    updateSlider();
}

function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}