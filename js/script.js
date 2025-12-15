const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
const btnPrev = document.querySelector('.slider-btn.prev');
const btnNext = document.querySelector('.slider-btn.next');

let current = 0;
let autoplayId = null;
const AUTOPLAY_DELAY = 6000;

function setActiveSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[index].classList.add('active');
  dots[index].classList.add('active');
  current = index;
}

function showNext(delta = 1) {
  const total = slides.length;
  let nextIndex = (current + delta + total) % total;
  setActiveSlide(nextIndex);
}

function startAutoplay() {
  stopAutoplay();
  autoplayId = setInterval(() => showNext(1), AUTOPLAY_DELAY);
}

function stopAutoplay() {
  if (autoplayId) {
    clearInterval(autoplayId);
    autoplayId = null;
  }
}

btnPrev.addEventListener('click', () => {
  showNext(-1);
  startAutoplay();
});

btnNext.addEventListener('click', () => {
  showNext(1);
  startAutoplay();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    setActiveSlide(index);
    startAutoplay();
  });
});

// Swipe on mobile
let startX = null;

const viewport = document.querySelector('.slider-viewport');

viewport.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
}, { passive: true });

viewport.addEventListener('touchend', (e) => {
  if (startX === null) return;
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (Math.abs(diff) > 50) {
    if (diff < 0) {
      showNext(1);
    } else {
      showNext(-1);
    }
    startAutoplay();
  }
  startX = null;
}, { passive: true });

// Init
setActiveSlide(0);
startAutoplay();
