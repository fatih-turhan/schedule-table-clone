import "../src/toggleNav.js";
import { getLocal, setLocal } from "../src/localStorage.js";

// elements
const container = document.querySelector(".game-center");
const btns = document.querySelectorAll(".number-btn");
const numbers = document.querySelectorAll(".number");
const value = document.querySelector(".value");
const resetBtn = document.querySelector(".reset-btn");
const finish = document.querySelector(".finish");
const bestTime = document.querySelector(".best-time");

const localItem = getLocal("time");
if (localItem) {
  bestTime.textContent = `Your Best:${localItem}`;
}

// ---times

// elements
const getTens = document.querySelector(".tens");
const getSec = document.querySelector(".seconds");
const getMin = document.querySelector(".minutes");
// const timeResult = document.querySelector(".time");

// init values
let tens = 0;
let seconds = 0;
let minutes = 0;

// increase fucntionaltiy
let interval;
const increase = () => {
  tens++;
  if (tens <= 9) {
    getTens.innerHTML = "0" + tens;
  }
  if (tens > 9) {
    getTens.innerHTML = tens;
  }
  if (tens > 99) {
    seconds++;
    getSec.innerHTML = "0" + seconds;
    tens = 0;
    getTens.innerHTML = "0" + 0;
  }
  if (seconds > 9) {
    getSec.innerHTML = seconds;
  }
  if (seconds > 59) {
    minutes++;
    getMin.innerHTML = "0" + minutes;
    seconds = 0;
    getSec = "0" + 0;
  }
  if (minutes > 9) {
    minutes.innerHTML = minutes;
  }
};

let initialValue = 1;
value.textContent = initialValue;

const createNumbers = () => {
  const emptyList = [];
  for (let i = 0; i < 25; i++) {
    const randomNum = Math.ceil(Math.random() * 25);
    if (!emptyList.includes(randomNum)) {
      emptyList.push(randomNum);
    } else {
      i = i - 1;
    }
  }
  container.innerHTML = emptyList
    .map((item) => {
      return `<button class="number-btn">
            <p class="number">${item}</p>
          </button>`;
    })
    .join("");
};
createNumbers();

container.addEventListener("click", (e) => {
  const selected = Number(e.target.textContent);
  if (initialValue === selected) {
    initialValue++;
    console.log(initialValue);
    e.target.parentElement.classList.add("active");
    e.target.classList.add("active");
    // start
    clearInterval(interval);
    interval = setInterval(increase, 10);
  }
  if (initialValue !== selected) {
    console.log("hello");
  }
  if (initialValue === 26) {
    finish.textContent = "you finished the game";
    value.parentElement.style.display = "none";
    initialValue = 25;

    // clear time
    clearInterval(interval);

    let resultTime = getMin.textContent + getSec.textContent + getTens.textContent;
    setLocal("time", resultTime);

    bestTime.textContent = `Your best:${getLocal("time")}`;
  }
  value.textContent = initialValue;
});

resetBtn.addEventListener("click", () => {
  createNumbers();
  initialValue = 1;
  value.parentElement.style.display = "block";
  finish.textContent = "";
  value.textContent = initialValue;
  const btns = document.querySelectorAll(".number-btn");
  const numbers = document.querySelectorAll(".number");
  btns.forEach((btn) => btn.classList.remove("active"));
  numbers.forEach((number) => number.classList.remove("active"));
  // reset
  clearInterval(interval);
  tens = "00";
  seconds = "00";
  minutes = "00";
  getTens.innerHTML = tens;
  getSec.innerHTML = seconds;
  getMin.innerHTML = minutes;
});
