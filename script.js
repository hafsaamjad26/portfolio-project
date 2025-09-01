


// ==== VARIABLES ====
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");
const scrollTopBtn = document.getElementById("scrollTopBtn");

// ==== PROFILE IMAGE SLIDER ====
const images = [
  "https://i.pinimg.com/736x/10/2a/57/102a5763d257f4927dce558a015c70cd.jpg",
  "https://i.pinimg.com/736x/e9/a5/48/e9a54817dd76d34a5420f281ffca9cc4.jpg",
  "https://i.pinimg.com/736x/d3/5c/cc/d35cccccefa59caeb34e256b68e1cd3a.jpg"
];
let index = 0;
const imgElement = document.getElementById("profile-img");

setInterval(() => {
  // fade out
  imgElement.classList.add("fade");

  setTimeout(() => {
    // change image
    index = (index + 1) % images.length;
    imgElement.src = images[index];

    // fade in
    setTimeout(() => imgElement.classList.remove("fade"), 50);

  }, 1000); // fade-out duration 1s
}, 5000); // 5s per image

// ==== HAMBURGER MENU TOGGLE ====
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// ==== SCROLL HANDLER ====
window.addEventListener("scroll", () => {
  const top = window.scrollY;

  // 1️⃣ Toggle scroll-to-top button
  scrollTopBtn.style.display = top > 200 ? "block" : "none";

  // 2️⃣ Highlight active nav link
  sections.forEach(sec => {
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => link.classList.remove("active"));
      const activeLink = document.querySelector(`header nav a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add("active");
    }
  });
});

// ==== SCROLL TO TOP ====
scrollTopBtn.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentIndex = 0;
const itemsPerPage = 3;
const totalItems = slides.length;
const totalPages = Math.ceil(totalItems / itemsPerPage);

function updateSlide() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextButton.addEventListener("click", () => {
  if (currentIndex < totalPages - 1) {
    currentIndex++;
    updateSlide();
  }
});

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlide();
  }
});
 
function getItemsPerPage() {
  if (window.innerWidth <= 600) return 1;   // mobile → 1 at a time
  if (window.innerWidth <= 991) return 2;   // tablet → 2 at a time
  return 3;                                 // desktop → 3 at a time
}

function updateSlide() {
  const itemsPerPage = getItemsPerPage();
  const slideWidth = track.clientWidth; // full width of track
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  const totalPages = Math.ceil(slides.length / itemsPerPage);

  // disable buttons at edges
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === totalPages - 1;
}

nextButton.addEventListener("click", () => {
  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(slides.length / itemsPerPage);

  if (currentIndex < totalPages - 1) {
    currentIndex++;
    updateSlide();
  }
});

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlide();
  }
});

window.addEventListener("resize", updateSlide);
updateSlide();
