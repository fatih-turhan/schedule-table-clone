function addColon(str) {
  let timeResult = "";
  for (let i = 0; i < str.length; i++) {
    timeResult += str[i];
    if (i === 1 || i === 3) {
      timeResult += ":";
    }
  }
  return timeResult;
}

export default addColon;
