"use strict";

const hamburgerBtn = document.querySelector("#hamburger");
const navList = document.querySelector(".nav-list");
const transparentLayer = document.querySelector(".transparent-layer");

console.log(navList);

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
