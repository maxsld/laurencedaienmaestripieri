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


const logos = [
  "assets/img/logo-track1.png",
  "assets/img/logo-track2.png",
  "assets/img/logo-track3.png",
  "assets/img/logo-track4.png",
  "assets/img/logo-track5.webp",
  "assets/img/logo-track6.png",
  "assets/img/logo-track7.png",
];

const track = document.getElementById("logo-track");

for (let i = 0; i < 100; i++) {
  logos.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Logo partenaire";
    track.appendChild(img);
  });
}


const medias = [
  { type: "img", src: "assets/img/image1.jpeg" },
  { type: "img", src: "assets/img/image2.jpeg" },
  { type: "video", src: "assets/videos/video1.mp4" },
  { type: "img", src: "assets/img/image3.jpeg" },
  { type: "video", src: "assets/videos/video2.mp4" },
  { type: "img", src: "assets/img/image4.jpeg" },
  { type: "img", src: "assets/img/image5.jpeg" },
  { type: "img", src: "assets/img/image6.png" },
  { type: "video", src: "assets/videos/video3.mp4" },
  { type: "img", src: "assets/img/image7.jpeg" },
];

function fillRow(rowId) {
  const row = document.getElementById(rowId);

  // Répéter 2x pour effet infini
  for (let i = 0; i < 2; i++) {
    medias.forEach(media => {
      let element;

      if (media.type === "img") {
        element = document.createElement("img");
        element.src = media.src;
        element.alt = "photo";
      } 
      else if (media.type === "video") {
        element = document.createElement("video");
        element.src = media.src;
        element.muted = true;
        element.loop = true;
        element.autoplay = true;
        element.playsInline = true;
      }

      row.appendChild(element);
    });
  }
}

fillRow("row");





document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
        const item = q.parentElement;
        item.classList.toggle("active");
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
}, 16000); // 16s d’attente avant lancement



document.querySelectorAll('.see-more').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.previousElementSibling;
    text.classList.toggle('expanded');
    btn.textContent = text.classList.contains('expanded') ? "Voir moins" : "Voir plus";
  });
});
