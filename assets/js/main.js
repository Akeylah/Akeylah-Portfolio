/*=============== CHANGE HEADER BACKGROUND ON SCROLL ===============*/
function scrollHeader() {
  const header = document.querySelector('.header');
  header.classList.toggle('scroll-header', window.scrollY > 50);
}
window.addEventListener('scroll', scrollHeader);


/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll(".services__modal"),
      modalBtns = document.querySelectorAll(".services__button"),
      modalClose = document.querySelectorAll(".services__modal-close");

modalBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => modalViews[i].classList.add("active-modal"));
});

modalClose.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalViews.forEach(modal => modal.classList.remove("active-modal"));
  });
});


/*=============== SWIPER TESTIMONIAL ===============*/
new Swiper(".testimonial__container", {
  spaceBetween: 24,
  loop: true,
  grabCursor: true,
  pagination: { el: ".swiper-pagination", clickable: true },
  breakpoints: {
    576: { slidesPerView: 2 },
    768: { slidesPerView: 2, spaceBetween: 48 },
  },
});


/*=============== SWIPER FOR WORK SECTION ===============*/
const swiperWork = new Swiper('.work__container', {
  slidesPerView: 3,
  spaceBetween: 40,
  centeredSlides: true,
  loop: true,
  grabCursor: true,
  observer: true,
  observeParents: true,
  autoplay: { delay: 2600, disableOnInteraction: false },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  pagination: { el: '.swiper-pagination', clickable: true },
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 150,
    modifier: 2,
    slideShadows: false,
  },
  breakpoints: {
    0: { slidesPerView: 1, spaceBetween: 20 },
    576: { slidesPerView: 1, spaceBetween: 20 },
    768: { slidesPerView: 2, spaceBetween: 30 },
    1024: { slidesPerView: 3, spaceBetween: 40 },
  }
});


/* ======== SWIPE AUDIO ======== */
const swipeAudio = document.getElementById('swipeAudio');
let isWorkSectionVisible = false;

// Detect when Work section is visible
const workSection = document.getElementById('work');
const workObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      isWorkSectionVisible = entry.isIntersecting; // true when visible
      if (!isWorkSectionVisible) {
        // Stop the audio when leaving the section
        swipeAudio.pause();
        swipeAudio.currentTime = 0;
      }
    });
  },
  { threshold: 0.3 } // Trigger when 30% of the section is visible
);
workObserver.observe(workSection);

// Play sound ONLY if Work section is visible
swiperWork.on('slideChange', () => {
  if (isWorkSectionVisible) {
    swipeAudio.currentTime = 0; 
    swipeAudio.play().catch(err => {
      console.warn("Audio blocked until user interacts with the page:", err);
    });
  }
});


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");
const sectionLinks = {};
sections.forEach(section => {
  const link = document.querySelector(`.nav__menu a[href*="#${section.id}"]`);
  if (link) sectionLinks[section.id] = link;
});

function scrollActive() {
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 58;
    const sectionBottom = sectionTop + section.offsetHeight;
    const link = sectionLinks[section.id];
    if (link) link.classList.toggle("active-link", scrollY > sectionTop && scrollY <= sectionBottom);
  });
}
window.addEventListener("scroll", scrollActive);


/*=============== LIGHT/DARK THEME ===============*/
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "bx-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? "light" : "dark";
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? "bx bx-sun" : "bx bx-moon";

if (selectedTheme) {
  document.body.classList[selectedTheme === "light" ? "add" : "remove"](lightTheme);
  themeButton.classList[selectedIcon === "bx bx-sun" ? "add" : "remove"](iconTheme);
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(lightTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});


/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({ origin: "top", distance: "30px", duration: 1500, delay: 400, reset: true });

sr.reveal(`.nav__menu`, { opacity: 0, scale: 0.1, reset: false });
sr.reveal(`.home__data`);
sr.reveal(`.home__handle`, { delay: 100 });
sr.reveal(`.home__social, .home__scroll`, { delay: 100, origin: "bottom" });
sr.reveal(`.about__img`, { delay: 100, origin: "left", scale: 0.9, distance: "30px" });
sr.reveal(`.about__data, .about__description, .about__button-contact`, { delay: 100, scale: 0.9, origin: "right", distance: "30px" });
sr.reveal(`.skills__content`, { delay: 100, scale: 0.9, origin: "bottom", distance: "30px" });
sr.reveal(`.services__title, .services__button`, { delay: 100, scale: 0.9, origin: "top", distance: "30px" });
sr.reveal(`.certification-tile`, { delay: 100, scale: 0.9, origin: "bottom", distance: "30px" });
sr.reveal(`.contact__info, .contact__title-info`, { delay: 100, scale: 0.9, origin: "left", distance: "30px" });
sr.reveal(`.contact__form, .contact__title-form`, { delay: 100, scale: 0.9, origin: "right", distance: "30px" });
sr.reveal(`.footer, .footer__container`, { delay: 100, scale: 0.9, origin: "bottom", distance: "30px" });
sr.reveal(`#education .section-header`, { origin: 'top', distance: '50px', duration: 2000, delay: 200, scale: 0.9 });
sr.reveal(`.timeline-item`, { origin: 'bottom', distance: '50px', duration: 2000, delay: 200, interval: 200 });


/*=============== TIMELINE OBSERVER ===============*/
const timelineItems = document.querySelectorAll(".timeline-item");
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
timelineItems.forEach(item => observer.observe(item));


/*=============== CONTACT FORM ===============*/
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const form = e.target;
  const msg = document.getElementById("formMsg");
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      msg.textContent = "✅ Thank you for reaching out! I’ll get back to you soon.";
      msg.style.color = "white";
      form.reset();
    } else {
      msg.textContent = "❌ Oops! Something went wrong. Please try again.";
      msg.style.color = "red";
    }
  } catch (error) {
    msg.textContent = "⚠️ Network error. Please check your connection.";
    msg.style.color = "red";
  } finally {
    submitButton.disabled = false;
  }
});
