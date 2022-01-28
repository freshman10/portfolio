import i18Obj from "./translate.js";
("use strict");

const hamburgerBtn = document.querySelector("#hamburger");
const navList = document.querySelector(".nav-list");
const transparentLayer = document.querySelector(".transparent-layer");
const seasonButtons = document.querySelectorAll(".season-button");
const portfolioImages = document.querySelectorAll(
  ".portfolio-img-container img"
);
const seasons = ["winter", "spring", "summer", "autumn"];
const languageContainer = document.querySelector(".lang-switch-container");
const languages = ["ru", "en"];
const langTranslateObjects = document.querySelectorAll("[data-i18]");
let langButtons = [];
languages.forEach((lang) => {
  langButtons.push(document.querySelector(`#${lang}`));
});
const themeSwitchButton = document.querySelector(".theme-switch");
const containers = document.querySelectorAll(
  ".skills-container, #price, #video, #portfolio"
);
const sectionTitles = document.querySelectorAll(".header-section");
const textSkills = document.querySelectorAll(".skills-items div p");
const horizontalLines = document.querySelectorAll(".horizontal-line");
const textPrice = document.querySelectorAll(
  ".price-description p, .price-plan"
);

/* humburger*/
hamburgerBtn.addEventListener("click", function () {
  hamburgerBtn.classList.toggle("is-active");
  navList.classList.toggle("open");
  transparentLayer.classList.toggle("visible-off");
});

navList.addEventListener("click", function () {
  navList.classList.remove("open");
  hamburgerBtn.classList.remove("is-active");
  transparentLayer.classList.add("visible-off");
});

/* season buttons */
function changePhoto(event) {
  seasonButtons.forEach((btn) => {
    btn.classList.remove("season-highlight");
    btn.classList.add("button-style");
  });
  event.target.classList.add("season-highlight");
  event.target.classList.remove("button-style");

  portfolioImages.forEach((img, i) => {
    img.src = `assets/img/${event.target.dataset.season}/${i + 1}.jpg`;
  });
}

seasonButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    changePhoto(event);
  });
});
function preloadSummerImages() {
  seasons.forEach((el) => {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${el}/${i}.jpg`;
    }
  });
}
preloadSummerImages();

/* Change language functional*/
function getTranslate(lang) {
  langTranslateObjects.forEach((el) => {
    if (Object.keys(i18Obj[lang]).includes(el.dataset.i18)) {
      if (el.placeholder) {
        el.placeholder = i18Obj[lang][el.dataset.i18];
      }
      el.textContent = "";
      el.textContent = i18Obj[lang][el.dataset.i18];
    }
  });
  if (languages.includes(lang)) {
    langButtons.forEach((btn) => {
      if (btn.id === lang) {
        btn.classList.add("active-lang");
      } else {
        btn.classList.remove("active-lang");
      }
    });
  }
}

languageContainer.addEventListener("click", function (event) {
  if (languages.includes(event.target.id)) {
    getTranslate(event.target.id);
    currentLanguage = event.target.id;
  }
});

/*theme switch*/

function switchTheme(flag = true) {
  if (flag) {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
  }
  console.log(currentTheme);
  containers.forEach((el) => el.classList.toggle("white-bg"));
  textSkills.forEach((el) => el.classList.toggle("black-font"));
  sectionTitles.forEach((el) => el.classList.toggle("black-font"));
  horizontalLines.forEach((el) => el.classList.toggle("black-line-color"));
  textPrice.forEach((el) => el.classList.toggle("black-font"));
  if (currentTheme === "light") {
    document.documentElement.style.setProperty("--button-bg-color", "#FFFFFF");
    document.documentElement.style.setProperty(
      "--button-font-color",
      "#000000"
    );
  }
  if (currentTheme === "dark") {
    document.documentElement.style.setProperty(
      "--button-font-color",
      "#FFFFFF"
    );
    document.documentElement.style.setProperty("--button-bg-color", "#000000");
  }
}

themeSwitchButton.addEventListener("click", switchTheme);

/*Save user config*/
let currentLanguage = "";
let currentTheme = "";
if (seasonButtons[0].classList.contains("white-bg")) {
  currentTheme = "light";
} else {
  currentTheme = "dark";
}

function setLocalStorage() {
  localStorage.setItem("lang", currentLanguage);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("lang")) {
    currentLanguage = localStorage.getItem("lang");
    getTranslate(currentLanguage);
    currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
      switchTheme(false);
    }
  }
}
window.addEventListener("load", getLocalStorage);

/*button effects*/
const buttonHireMe = document.querySelectorAll(
  "#hire-me-btn, .order, .send-message"
);
console.log(buttonHireMe);

buttonHireMe.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;

    const buttonTop = e.target.offsetTop;
    const buttonLeft = e.target.offsetLeft;

    const xInside = x - buttonLeft;
    const yInside = y - buttonTop + window.scrollY;

    const circle = document.createElement("span");
    circle.classList.add("circle");
    circle.style.top = yInside + "px";
    circle.style.left = xInside + "px";

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 500);
  });
});
