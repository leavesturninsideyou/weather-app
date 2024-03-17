import getWeatherInfo from "./apiHitter";
import logo from "./imgs/logo.png";
import back from "./imgs/arrow-left-bold-circle-outline.svg";

const input = document.querySelector("input");
const submitBtn = document.getElementById("submit");
const errorLabel = document.querySelector("span.error");

function loadImgs() {
  const logoImg = document.querySelector("#logo-container img");
  const backSvg = document.querySelector("footer img");

  logoImg.src = logo;
  backSvg.src = back;
}

function checkErrors() {
  if (input.validity.valueMissing) {
    input.classList.add("no-val");
    errorLabel.textContent = "This field cannot be empty.";
  } else {
    errorLabel.textContent = "";
    input.classList.remove("no-val");
    return false;
  }

  return true;
}

loadImgs();

input.addEventListener("input", () => {
  checkErrors();
});

submitBtn.addEventListener("click", () => {
  const inputError = checkErrors();

  if (!inputError) {
    getWeatherInfo(input.value);
  }
});
