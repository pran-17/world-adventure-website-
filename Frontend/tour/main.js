const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const bookingType = document.getElementById("booking-type");

bookingType.addEventListener("click", (e) => {
  Array.from(bookingType.getElementsByTagName("div")).forEach((item) => {
    item.classList.remove("active");
  });

  e.target.classList.add("active");
});

const swiper = new Swiper(".swiper", {
  slidesPerView: "auto",
  spaceBetween: 20,
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// header container
ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".header__container p", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".header__container .booking", {
  ...scrollRevealOption,
  delay: 1000,
});

// service container
ScrollReveal().reveal(".service__card", {
  duration: 1000,
  interval: 500,
});

// offer container
ScrollReveal().reveal(".offer__card", {
  ...scrollRevealOption,
  interval: 500,
});

const LOGIN_PAGE_URL = "../sign/index.html";
const BOOKING_PAGE_URL = "../login/index.html";
const AUTH_STORAGE_KEY = "user";

const getStoredUser = () => {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored);
    return parsed && parsed.id ? parsed : null;
  } catch (error) {
    return null;
  }
};

const requireAuth = () => {
  const user = getStoredUser();
  if (!user) {
    alert("Please login or register to continue booking.");
    window.location.href = LOGIN_PAGE_URL;
    return false;
  }
  return true;
};

const bookButtons = document.querySelectorAll("[data-book-btn]");
bookButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    if (!requireAuth()) return;
    window.location.href = BOOKING_PAGE_URL;
  });
});

const loginButtons = document.querySelectorAll("[data-login-btn]");
loginButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = LOGIN_PAGE_URL;
  });
});