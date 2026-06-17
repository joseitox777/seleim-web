/* =========================
   HERO BACKGROUND SLIDER
========================= */
const hero = document.querySelector(".hero");

if (hero) {
  const heroImages = [
    "assets/images/subestacion.jpg",
    "assets/images/instrumentacion.jpg",
    "assets/images/mecanica.png",
  ];

  let heroIndex = 0;

  function changeHero() {
    hero.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
    heroIndex = (heroIndex + 1) % heroImages.length;
  }

  changeHero();
  setInterval(changeHero, 5000);
}

/* =========================
   REVEAL ON SCROLL
========================= */
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.88;

  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();

    if (rect.top < triggerBottom) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* =========================
   SERVICES SLIDER
========================= */

const servicesTrack = document.getElementById("servicesTrack");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
const servicesSlider = document.querySelector(".services-slider");
const servicesProgressBar = document.querySelector(".services-progress-bar");

if (servicesTrack && prevBtn && nextBtn && servicesSlider) {
  const slides = document.querySelectorAll(".service-slide");
  let currentSlide = 0;
  let serviceTimer;
  let startTime;
  let remainingTime;
  let isServicePaused = false;

  const SERVICE_SLIDE_TIME = 10000;

  function updateSlider() {
    servicesTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  function animateServicesProgress(duration, fromPercent = 0) {
    if (!servicesProgressBar) return;

    servicesProgressBar.style.transition = "none";
    servicesProgressBar.style.width = `${fromPercent}%`;

    setTimeout(() => {
      servicesProgressBar.style.transition = `width ${duration}ms linear`;
      servicesProgressBar.style.width = "100%";
    }, 50);
  }

  function nextServiceSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
    startServicesAutoplay(SERVICE_SLIDE_TIME, 0);
  }

  function startServicesAutoplay(
    duration = SERVICE_SLIDE_TIME,
    fromPercent = 0,
  ) {
    clearTimeout(serviceTimer);

    isServicePaused = false;
    remainingTime = duration;
    startTime = Date.now();

    animateServicesProgress(duration, fromPercent);

    serviceTimer = setTimeout(() => {
      nextServiceSlide();
    }, duration);
  }

  function pauseServicesAutoplay() {
    if (isServicePaused) return;

    isServicePaused = true;
    clearTimeout(serviceTimer);

    const elapsed = Date.now() - startTime;
    remainingTime = Math.max(0, remainingTime - elapsed);

    const progressPercent =
      ((SERVICE_SLIDE_TIME - remainingTime) / SERVICE_SLIDE_TIME) * 100;

    if (servicesProgressBar) {
      servicesProgressBar.style.transition = "none";
      servicesProgressBar.style.width = `${progressPercent}%`;
    }
  }

  function resumeServicesAutoplay() {
    if (!isServicePaused) return;

    const progressPercent =
      ((SERVICE_SLIDE_TIME - remainingTime) / SERVICE_SLIDE_TIME) * 100;

    startServicesAutoplay(remainingTime, progressPercent);
  }

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
    startServicesAutoplay(SERVICE_SLIDE_TIME, 0);
  });

  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
    startServicesAutoplay(SERVICE_SLIDE_TIME, 0);
  });

  servicesSlider.addEventListener("mouseenter", pauseServicesAutoplay);
  servicesSlider.addEventListener("mouseleave", resumeServicesAutoplay);

  updateSlider();
  startServicesAutoplay(SERVICE_SLIDE_TIME, 0);
}

/* =========================
   PROJECTS FADE SLIDER
========================= */

const projectPrevBtn = document.querySelector(".project-prev");
const projectNextBtn = document.querySelector(".project-next");
const projectSlides = document.querySelectorAll(".project-fade-slide");
const projectDots = document.querySelectorAll(".project-dot");
const projectsSlider = document.querySelector(".projects-fade-slider");
const projectProgressBar = document.querySelector(".projects-progress-bar");

if (projectSlides.length > 0 && projectDots.length > 0 && projectsSlider) {
  let currentProject = 0;
  let projectTimer;
  let startTime;
  let remainingTime;
  let isPaused = false;

  const PROJECT_SLIDE_TIME = 12000;

  function showProject(index) {
    projectSlides.forEach((slide) => slide.classList.remove("active"));
    projectDots.forEach((dot) => dot.classList.remove("active"));

    projectSlides[index].classList.add("active");
    projectDots[index].classList.add("active");

    currentProject = index;
  }

  function animateProgress(duration, fromPercent = 0) {
    if (!projectProgressBar) return;

    projectProgressBar.style.transition = "none";
    projectProgressBar.style.width = `${fromPercent}%`;

    setTimeout(() => {
      projectProgressBar.style.transition = `width ${duration}ms linear`;
      projectProgressBar.style.width = "100%";
    }, 50);
  }
  if (projectNextBtn) {
    projectNextBtn.addEventListener("click", () => {
      currentProject = (currentProject + 1) % projectSlides.length;
      showProject(currentProject);
      startProjectAutoplay(PROJECT_SLIDE_TIME, 0);
    });
  }

  if (projectPrevBtn) {
    projectPrevBtn.addEventListener("click", () => {
      currentProject =
        (currentProject - 1 + projectSlides.length) % projectSlides.length;
      showProject(currentProject);
      startProjectAutoplay(PROJECT_SLIDE_TIME, 0);
    });
  }
  function nextProject() {
    currentProject = (currentProject + 1) % projectSlides.length;
    showProject(currentProject);
    startProjectAutoplay(PROJECT_SLIDE_TIME, 0);
  }

  function startProjectAutoplay(
    duration = PROJECT_SLIDE_TIME,
    fromPercent = 0,
  ) {
    clearTimeout(projectTimer);

    isPaused = false;
    remainingTime = duration;
    startTime = Date.now();

    animateProgress(duration, fromPercent);

    projectTimer = setTimeout(() => {
      nextProject();
    }, duration);
  }

  function pauseProjectAutoplay() {
    if (isPaused) return;

    isPaused = true;
    clearTimeout(projectTimer);

    const elapsed = Date.now() - startTime;
    remainingTime = Math.max(0, remainingTime - elapsed);

    const progressPercent =
      ((PROJECT_SLIDE_TIME - remainingTime) / PROJECT_SLIDE_TIME) * 100;

    if (projectProgressBar) {
      projectProgressBar.style.transition = "none";
      projectProgressBar.style.width = `${progressPercent}%`;
    }
  }

  function resumeProjectAutoplay() {
    if (!isPaused) return;

    const progressPercent =
      ((PROJECT_SLIDE_TIME - remainingTime) / PROJECT_SLIDE_TIME) * 100;

    startProjectAutoplay(remainingTime, progressPercent);
  }

  projectDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showProject(index);
      startProjectAutoplay(PROJECT_SLIDE_TIME, 0);
    });
  });

  projectsSlider.addEventListener("mouseenter", pauseProjectAutoplay);
  projectsSlider.addEventListener("mouseleave", resumeProjectAutoplay);

  showProject(0);
  startProjectAutoplay(PROJECT_SLIDE_TIME, 0);
}
