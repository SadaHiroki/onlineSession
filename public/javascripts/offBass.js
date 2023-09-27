window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

//ギター
const bassClass = new Bass();

//クリック
bassClass.basses.forEach((bass) => {
  const array = document.getElementsByClassName(bass.class);
  for (let i = 0; i < array.length; i++) {
    array[i].addEventListener("click", () => {
      bassClass.play(bass.source, i);
    });
  }
});
