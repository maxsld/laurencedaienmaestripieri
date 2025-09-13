document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

let slides = document.querySelectorAll('.carousel-slide');
let index = 0;
let interval;
let progressBar = document.querySelector('.progress-bar');

const intervalDuration = 6000; // 6 secondes
let startTime = null;
let animationFrameId = null;

function showSlide(i) {
  // Désactive tous les slides
  slides.forEach(slide => {
    slide.classList.remove('active');

    // Met en pause les vidéos présentes dans les slides inactifs
    let video = slide.querySelector('video');
    if (video) {
      video.pause();
      video.currentTime = 0; // optionnel : remettre à 0
    }
  });

  // Active le slide courant
  slides[i].classList.add('active');
  resetProgressBar();
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function startAutoSlide() {
  if (!interval) {
    interval = setInterval(() => {
      nextSlide();
      startTime = performance.now();
    }, intervalDuration);
    startTime = performance.now();
    animateProgressBar();
  }
}

function stopAutoSlide() {
  clearInterval(interval);
  interval = null;
  cancelAnimationFrame(animationFrameId);
}

function resetProgressBar() {
  progressBar.style.width = '0%';
}

function animateProgressBar(timestamp) {
  if (!startTime) startTime = timestamp;
  if (!timestamp) timestamp = performance.now();
  const elapsed = timestamp - startTime;
  const progressPercent = Math.min((elapsed / intervalDuration) * 100, 100);
  progressBar.style.width = progressPercent + '%';

  if (elapsed < intervalDuration) {
    animationFrameId = requestAnimationFrame(animateProgressBar);
  } else {
    progressBar.style.width = '100%';
  }
}

// Pause carrousel quand une vidéo joue et arrêter animation barre
document.querySelectorAll('.carousel-slide video').forEach(video => {
  video.addEventListener('play', stopAutoSlide);
  video.addEventListener('pause', startAutoSlide);
  video.addEventListener('ended', startAutoSlide);
});

showSlide(index);
setTimeout(() => {
  startAutoSlide();
}, 10000); // 10s d’attente avant lancement



document.querySelectorAll('.see-more').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.previousElementSibling;
    text.classList.toggle('expanded');
    btn.textContent = text.classList.contains('expanded') ? "Voir moins" : "Voir plus";
  });
});