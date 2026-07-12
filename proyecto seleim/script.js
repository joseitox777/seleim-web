

/* =========================
   MOBILE NAVIGATION
========================= */
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const mobileDropdown = document.querySelector(".primary-nav .dropdown");
const dropdownToggle = document.querySelector(".dropdown-toggle");

function closeMobileNavigation() {
  if (!menuToggle || !primaryNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menú de navegación");
  primaryNav.classList.remove("is-open");
  document.body.classList.remove("menu-open");

  if (mobileDropdown && dropdownToggle) {
    mobileDropdown.classList.remove("is-open");
    dropdownToggle.setAttribute("aria-expanded", "false");
  }
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const willOpen = !primaryNav.classList.contains("is-open");
    primaryNav.classList.toggle("is-open", willOpen);
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    menuToggle.setAttribute(
      "aria-label",
      willOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación",
    );
    document.body.classList.toggle("menu-open", willOpen);
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) closeMobileNavigation();
    });
  });
}

if (mobileDropdown && dropdownToggle) {
  dropdownToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = !mobileDropdown.classList.contains("is-open");
    mobileDropdown.classList.toggle("is-open", willOpen);
    dropdownToggle.setAttribute("aria-expanded", String(willOpen));
  });
}

document.addEventListener("click", (event) => {
  if (
    window.innerWidth <= 900 &&
    siteHeader &&
    primaryNav &&
    primaryNav.classList.contains("is-open") &&
    !siteHeader.contains(event.target)
  ) {
    closeMobileNavigation();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMobileNavigation();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMobileNavigation();
});

/* =========================
   TOUCH SWIPE HELPER
========================= */
function addSwipeNavigation(element, onSwipeLeft, onSwipeRight) {
  if (!element) return;

  let startX = 0;
  let startY = 0;

  element.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.changedTouches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    },
    { passive: true },
  );

  element.addEventListener(
    "touchend",
    (event) => {
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      if (Math.abs(deltaX) < 55 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

      if (deltaX < 0) onSwipeLeft();
      else onSwipeRight();
    },
    { passive: true },
  );
}

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

  addSwipeNavigation(
    servicesSlider,
    () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
      startServicesAutoplay(SERVICE_SLIDE_TIME, 0);
    },
    () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
      startServicesAutoplay(SERVICE_SLIDE_TIME, 0);
    },
  );

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

  addSwipeNavigation(
    projectsSlider,
    () => {
      currentProject = (currentProject + 1) % projectSlides.length;
      showProject(currentProject);
      startProjectAutoplay(PROJECT_SLIDE_TIME, 0);
    },
    () => {
      currentProject =
        (currentProject - 1 + projectSlides.length) % projectSlides.length;
      showProject(currentProject);
      startProjectAutoplay(PROJECT_SLIDE_TIME, 0);
    },
  );

  projectsSlider.addEventListener("mouseenter", pauseProjectAutoplay);
  projectsSlider.addEventListener("mouseleave", resumeProjectAutoplay);

  showProject(0);
  startProjectAutoplay(PROJECT_SLIDE_TIME, 0);
}

/* =========================
   CLIENTS INFINITE SLIDER
========================= */

const clientsTrack = document.querySelector(".clients-track");

if (clientsTrack && !clientsTrack.dataset.loopReady) {
  const originalLogos = Array.from(clientsTrack.children);

  originalLogos.forEach((logo) => {
    const clone = logo.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clientsTrack.appendChild(clone);
  });

  clientsTrack.dataset.loopReady = "true";
}
