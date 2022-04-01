import "../src/toggleNav.js";

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
  form.style.display = "none";
  container.classList.remove("bigger-than-50", "bigger-than-150");
  exp.textContent = ``;
  // create new Numbers
  createNumbers(inputValue);
};

// create numbers from input value
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // get value from input
  inputValue = Number(input.value);
  if (!inputValue) {
    exp.textContent = `please enter value to from or sellect buttons`;
  } else {
    if (inputValue <= 250) {
      createFunction();
    } else {
      exp.textContent = `number should be between 0 250`;
    }
  }
});

// create numbers from button value
btnsContainer.addEventListener("click", (e) => {
  // get value from input
  inputValue = Number(e.target.textContent);
  createFunction();
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
  }
  // stop game
  if (initialValue === inputValue + 1) {
    finish.textContent = "you finished the game";
    value.parentElement.style.display = "none";
    initialValue = inputValue;
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
};

resetBtn.addEventListener("click", () => {
  resetFunction();
  createNumbers(inputValue);
});

resetBuildBtn.addEventListener("click", () => {
  btnsContainer.style.display = "flex";
  form.style.display = "grid";
  hide.classList.add("hide");
  resetFunction();
});
