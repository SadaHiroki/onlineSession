window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

//ギター
const guitarClass = new Guitar();

//クリック
guitarClass.guitars.forEach((guitar) => {
  const array = document.getElementsByClassName(guitar.class);
  for (let i = 0; i < array.length; i++) {
    array[i].addEventListener("click", () => {
      guitarClass.play(guitar.source, i);
    });
  }
});

//キーボード
var minorFlag = false;
document.addEventListener("keydown", (e) => {
  var count = 0;
  var code;
  if (e.key === "m" || e.key === "M") {
    minorFlag = true;
  }
  if (minorFlag) {
    if ((e.key != "m" || e.key != "M") && e.key in guitarClass.codes) {
      code = guitarClass.codes["m"][e.key];
    }
  } else {
    if ((e.key != "m" || e.key != "M") && e.key in guitarClass.codes) {
      code = guitarClass.codes[e.key];
    }
  }
  if (code) {
    code.forEach((i) => {
      guitarClass.play(guitarClass.guitars[count].source, i);
      count++;
    });
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "m" || e.key === "M") {
    minorFlag = false;
  }
});
