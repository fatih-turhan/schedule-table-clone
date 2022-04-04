import "../src/toggleNav.js";
import { setLocal, getLocal } from "../src/localStorage.js";

// sellect elements
const container = document.querySelector(".game-center");
const value = document.querySelector(".value");
const resetBtn = document.querySelector(".reset-btn");
const finish = document.querySelector(".finish");
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const hide = document.querySelector(".hide");
const btnsContainer = document.querySelector(".buttons");
const exp = document.querySelector(".explain");
const resetBuildBtn = document.querySelector(".reset-build-btn");
const bestTime = document.querySelector(".best-time");

// ---times
// elements
const getTens = document.querySelector(".tens");
const getSec = document.querySelector(".seconds");
const getMin = document.querySelector(".minutes");

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

// define value
let initialValue = 1;
value.textContent = initialValue;

// global inputValue
let inputValue;

// create list of random numbers
const createNumbers = (number) => {
  // create list
  const emptyList = [];
  for (let i = 0; i < number; i++) {
    const randomNum = Math.ceil(Math.random() * number);
    if (!emptyList.includes(randomNum)) {
      emptyList.push(randomNum);
    } else {
      i = i - 1;
    }
  }
  // add the container
  container.innerHTML = emptyList
    .map((item) => {
      return `<button class="number-btn">
            <p class="number">${item}</p>
          </button>`;
    })
    .join("");

  // display numbers
  hide.classList.remove("hide");
  // add css based on number
  if (container.children.length >= 50) {
    container.classList.add("bigger-than-50");
  }
  if (container.children.length >= 150) {
    container.classList.add("bigger-than-150");
  }
};

const createFunction = () => {
  // hide when
  btnsContainer.style.display = "none";
  // form.style.display = "none";
  container.classList.remove("bigger-than-50", "bigger-than-150");
  exp.textContent = ``;
  // create new Numbers
  createNumbers(inputValue);
};

// create numbers from input value
// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   inputValue = Number(input.value);
//   if (!inputValue) {
//     exp.textContent = `please enter value to from or sellect buttons`;
//   } else {
//     if (inputValue <= 250) {
//       createFunction();
//     } else {
//       exp.textContent = `number should be between 0 250`;
//     }
//   }
// });

// create numbers from button value
btnsContainer.addEventListener("click", (e) => {
  // get value from input
  inputValue = Number(e.target.textContent);
  createFunction();
  // inputValue
  console.log(inputValue);
  const localItem = getLocal(inputValue);
  if (localItem) {
    bestTime.textContent = `Your best:${getLocal(inputValue)}`;
  } else {
    bestTime.textContent = ``;
  }
});

container.addEventListener("click", (e) => {
  const selected = Number(e.target.textContent);
  // increase if selected true
  if (initialValue === selected) {
    initialValue++;
    console.log(initialValue);
    e.target.parentElement.classList.add("active");
    e.target.classList.add("active");
    console.log(inputValue, initialValue);
    // start time
    clearInterval(interval);
    interval = setInterval(increase, 10);
  }
  // stop game
  if (initialValue === inputValue + 1) {
    finish.textContent = "you finished the game";
    value.parentElement.style.display = "none";
    initialValue = inputValue;

    // clear time
    clearInterval(interval);

    let resultTime = getMin.textContent + getSec.textContent + getTens.textContent;
    setLocal(inputValue, resultTime);

    bestTime.textContent = `Your best:${getLocal(inputValue)}`;
  }
  value.textContent = initialValue;
});

// reset all
const resetFunction = () => {
  initialValue = 1;
  value.parentElement.style.display = "block";
  finish.textContent = "";
  value.textContent = initialValue;
  // remove dark from all btns
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
};

resetBtn.addEventListener("click", () => {
  resetFunction();
  createNumbers(inputValue);
});

resetBuildBtn.addEventListener("click", () => {
  btnsContainer.style.display = "flex";
  // form.style.display = "grid";
  hide.classList.add("hide");
  resetFunction();
});
