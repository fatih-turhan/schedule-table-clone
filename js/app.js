const container = document.querySelector(".game-center");
const btns = document.querySelectorAll(".number-btn");
const value = document.querySelector(".value");

let initialValue = 1;

value.textContent = initialValue;
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

container.addEventListener("click", (e) => {
  const selected = Number(e.target.textContent);
  if (initialValue === selected) {
    initialValue++;
    console.log(initialValue);
    e.target.parentElement.classList.add("active");
    e.target.classList.add("active");
  }
  if (initialValue === 26) {
    initialValue = 25;
    // console.log("hello");
  }
  value.textContent = initialValue;
});
