const toggleBtn = document.querySelector(".sidebar-btn");
const closeBtn = document.querySelector(".close-btn");
const sideBar = document.querySelector(".aside");

toggleBtn.addEventListener("click", () => {
  sideBar.classList.toggle("show");
});
closeBtn.addEventListener("click", () => {
  sideBar.classList.remove("show");
});
