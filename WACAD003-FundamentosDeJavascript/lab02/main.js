const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

/* Declaring the array of image filenames */
const images = [
  "./images/pic1.png",
  "./images/pic2.png",
  "./images/pic3.png",
  "./images/pic4.png",
  "./images/pic5.png",
];

/* Declaring the alternative text for each image file */

const altTexts = [
  "Prensa Francesa",
  "V60",
  "Aero press",
  "Espresso Machine",
  "Moka",
];

/* Looping through images */

for (let i = 0; i < images.length; i++) {
  const newImage = document.createElement("img");
  newImage.setAttribute("src", images[i]);
  newImage.setAttribute("alt", altTexts[i]);
  thumbBar.appendChild(newImage);
  newImage.addEventListener("click", () => {
    const src = newImage.getAttribute("src");
    const alt = newImage.getAttribute("alt");
    displayedImage.setAttribute("src", src);
    displayedImage.setAttribute("alt", alt);
  });
}
/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", () => {
  const className = btn.getAttribute("class");
  if (className === "dark") {
    btn.setAttribute("class", "light");
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
  } else {
    btn.setAttribute("class", "dark");
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
  }
});
