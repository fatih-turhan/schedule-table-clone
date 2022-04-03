const setLocal = (name, number) => {
  const newNumber = Number(number);
  const getLocalItem = Number(localStorage.getItem(name));
  console.log(newNumber, getLocalItem);
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
    function stringFunciton(str) {
      let timeResult = "";
      for (let i = 0; i < str.length; i++) {
        timeResult += str[i];
        if (i === 1 || i === 3) {
          timeResult += ":";
        }
      }
      // console.log(timeResult)
      return timeResult;
    }
    return stringFunciton(lastTime);
  }
};

export { setLocal, getLocal };
