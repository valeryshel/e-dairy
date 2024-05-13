"use strict";
const buttonAddCat = document.querySelector(".buttonAddCat");
const catImgWrapper = document.querySelector(".catImgWrapper");
buttonAddCat.textContent = "Показать котика";

function showCat() {
  buttonAddCat.textContent = "Показать другого котика";
  if (catImgWrapper.firstChild) {
    catImgWrapper.removeChild(catImgWrapper.firstChild);
  }
  fetch(" https://api.thecatapi.com/v1/images/search")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const catImg = document.createElement("img");
      catImg.src = data[0].url;
      catImg.classList.add("catImg");
      catImgWrapper.appendChild(catImg);
    })
    .catch((err) => console.log("Ошибка:", err));
}

buttonAddCat.addEventListener("click", showCat);
