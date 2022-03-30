import "../src/toggleNav.js";

const container = document.querySelector(".game-center");
const btns = document.querySelectorAll(".number-btn");
const numbers = document.querySelectorAll(".number");
const value = document.querySelector(".value");
const resetBtn = document.querySelector(".reset-btn");
const finish = document.querySelector(".finish");

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
  }
  if (initialValue !== selected) {
    console.log("hello");
  }
  if (initialValue === 26) {
    finish.textContent = "you finished the game";
    value.parentElement.style.display = "none";
    initialValue = 25;
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
});
