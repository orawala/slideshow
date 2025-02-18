let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const slideBar = document.querySelector(".slide-bar");
const autoPlayToggle = document.getElementById("autoPlayToggle");

let slideInterval = setInterval(nextSlide, 5000);
let isAutoPlay = true;

// Create slide bar dots dynamically
slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.addEventListener("click", () => goToSlide(index));
    slideBar.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        dots[i].classList.remove("active");
        if (i === index) {
            slide.classList.add("active");
            dots[i].classList.add("active");
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    resetAutoSlide();
}

// Toggle Auto Slideshow
function toggleAutoPlay() {
    if (autoPlayToggle.checked) {
        isAutoPlay = true;
        slideInterval = setInterval(nextSlide, 5000);
    } else {
        isAutoPlay = false;
        clearInterval(slideInterval);
    }
}

// Reset Auto Slide on Manual Navigation
function resetAutoSlide() {
    if (isAutoPlay) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
}

// Attach event listeners to buttons
document.querySelector(".prev").addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
});

document.querySelector(".next").addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
});

// 🔹 Add Keyboard Navigation (⬅ & ➡)
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        prevSlide();
        resetAutoSlide();
    } else if (event.key === "ArrowRight") {
        nextSlide();
        resetAutoSlide();
    }
});

showSlide(currentSlide);
