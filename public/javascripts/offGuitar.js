window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

//ギター
const guitarClass = new Guitar();
guitarClass.guitars.forEach((guitar) => {
  const array = document.getElementsByClassName(guitar.class);
  for (let i = 0; i < array.length; i++) {
    array[i].addEventListener("click", () => {
      guitarClass.play(guitar.source, i);
    });
  }
});

document.addEventListener("keyup", (e) => {
  var count = 0;
  if (e.key in guitarClass.codes) {
    guitarClass.codes[e.key].forEach((i) => {
      guitarClass.play(guitarClass.guitars[count].source, i);
      count++;
    });
  }
});
