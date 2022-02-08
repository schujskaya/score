/* main-slider for index.html START */

let slideIndex = 1;
showSlides(slideIndex);

function nextSlide() {
    showSlides(slideIndex += 1);
    makeTimer();
}

function previousSlide() {
    showSlides(slideIndex -= 1);
    makeTimer();
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("main-slider__item");

    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }

    for (let slide of slides) {
        slide.style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
}

let timer = 0;
makeTimer();
function makeTimer() {
    clearInterval(timer);
    timer = setInterval(function () {
        slideIndex++;
        showSlides(slideIndex);
    }, 5000);
}

/* main-slider for index.html END */