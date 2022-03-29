import "../src/toggleNav.js";

const container = document.querySelector(".game-center");
const value = document.querySelector(".value");
const resetBtn = document.querySelector(".reset-btn");
const finish = document.querySelector(".finish");
const form = document.querySelector(".form");
const input = document.querySelector(".input");

let initialValue = 1;
value.textContent = initialValue;

let inputValue;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputValue = Number(input.value);
  createNumbers(inputValue);
});

const createNumbers = (number) => {
  const emptyList = [];
  for (let i = 0; i < number; i++) {
    const randomNum = Math.ceil(Math.random() * number);
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
// createNumbers(30);

container.addEventListener("click", (e) => {
  const selected = Number(e.target.textContent);
  if (initialValue === selected) {
    initialValue++;
    console.log(initialValue);
    e.target.parentElement.classList.add("active");
    e.target.classList.add("active");
  }
  if (initialValue === 26) {
    finish.textContent = "you finished the game";
    value.parentElement.style.display = "none";
    initialValue = 25;
  }
  value.textContent = initialValue;
});

resetBtn.addEventListener("click", () => {
  createNumbers(inputValue);
  initialValue = 1;
  value.parentElement.style.display = "block";
  finish.textContent = "";
  value.textContent = initialValue;
  const btns = document.querySelectorAll(".number-btn");
  const numbers = document.querySelectorAll(".number");
  btns.forEach((btn) => btn.classList.remove("active"));
  numbers.forEach((number) => number.classList.remove("active"));
});
