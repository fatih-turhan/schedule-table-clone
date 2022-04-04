import addColon from "./addColon.js";

const setLocal = (name, number) => {
  const newNumber = Number(number);
  const getLocalItem = Number(localStorage.getItem(name));

  if (getLocalItem) {
    if (newNumber < getLocalItem) {
      localStorage.setItem(name, number);
    }
  } else {
    localStorage.setItem(name, number);
  }
};

const getLocal = (name) => {
  const lastTime = localStorage.getItem(name);
  if (lastTime) {
    return addColon(lastTime);
  }
};

export { setLocal, getLocal };
