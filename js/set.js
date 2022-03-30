import "../src/toggleNav.js";

const container = document.querySelector(".game-center");
const value = document.querySelector(".value");
const resetBtn = document.querySelector(".reset-btn");
const finish = document.querySelector(".finish");
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const hide = document.querySelector(".hide");

let initialValue = 1;
value.textContent = initialValue;

let inputValue;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputValue = Number(input.value);
  container.classList.remove(
    "more-than-40",
    "more-than-70",
    "more-than-100",
    "more-than-150"
  );
  hide.classList.remove("hide");
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
  if (container.children.length > 40) {
    container.classList.add("more-than-40");
  }
  if (container.children.length > 70) {
    container.classList.add("more-than-70");
  }
  if (container.children.length > 100) {
    container.classList.add("more-than-100");
  }
  if (container.children.length > 150) {
    container.classList.add("more-than-150");
  }
};
// createNumbers(30);

container.addEventListener("click", (e) => {
  const selected = Number(e.target.textContent);
  if (initialValue === selected) {
    initialValue++;
    console.log(initialValue);
    e.target.parentElement.classList.add("active");
    e.target.classList.add("active");
    console.log(inputValue, initialValue);
  }
  if (initialValue === inputValue + 1) {
    finish.textContent = "you finished the game";
    value.parentElement.style.display = "none";
    initialValue = inputValue;
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
