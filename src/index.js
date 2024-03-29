import getWeatherInfo from "./apiHitter";
import logo from "./imgs/logo.png";
import back from "./imgs/arrow-left-bold-circle-outline.svg";
import { showSplash } from "./pageTransitions";

const input = document.querySelector("input");
const submitBtn = document.getElementById("submit");
const errorLabel = document.querySelector("span.error");
const backBtn = document.querySelectorAll(".back");
const slider = document.querySelector("input[type='checkbox']");

function loadImgs() {
  const logoImg = document.querySelector("#logo-container img");

  logoImg.src = logo;

  backBtn.forEach((btn) => {
    const img = btn;
    img.src = back;
  });
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

function changeToMetric(degrees, windSpeed) {
  const degreeNode = degrees;
  const windSpeedNode = windSpeed;

  const { celsius } = degreeNode.dataset;
  const { kph } = windSpeedNode.dataset;

  degreeNode.textContent = `${celsius}°C`;
  windSpeedNode.textContent = `Wind Speed: ${kph}kph`;
}

function changeToImperial(degrees, windSpeed) {
  const degreeNode = degrees;
  const windSpeedNode = windSpeed;

  const { fahrenheit } = degreeNode.dataset;
  const { mph } = windSpeedNode.dataset;

  degreeNode.textContent = `${fahrenheit}°F`;
  windSpeedNode.textContent = `Wind Speed: ${mph}mph`;
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

backBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    showSplash();
  });
});

slider.addEventListener("click", (event) => {
  const degreeNode =
    event.target.parentNode.parentNode.parentNode.querySelector("#degrees");
  const windSpeedNode =
    event.target.parentNode.parentNode.parentNode.querySelector("#wind-speed");
  if (event.target.checked) {
    changeToMetric(degreeNode, windSpeedNode);
  } else {
    changeToImperial(degreeNode, windSpeedNode);
  }
});
