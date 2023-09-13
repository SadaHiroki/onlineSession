window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

//ギター
const guitarClass = new Guitar();
const guitars = [
  {
    class: "first",
    source: "audio/guitar1-E.mp3",
  },
  {
    class: "second",
    source: "audio/guitar2-B.mp3",
  },
  {
    class: "third",
    source: "audio/guitar3-G.mp3",
  },
  {
    class: "four",
    source: "audio/guitar4-D.mp3",
  },
  {
    class: "five",
    source: "audio/guitar5-A.mp3",
  },
  {
    class: "six",
    source: "audio/guitar6-E.mp3",
  },
];
guitars.forEach((guitar) => {
  const array = document.getElementsByClassName(guitar.class);
  for (let i = 0; i < array.length; i++) {
    array[i].addEventListener("click", () => {
      guitarClass.play(guitar.source, i);
    });
  }
});
