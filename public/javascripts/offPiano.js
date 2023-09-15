window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// ピアノ
const piano = new Piano();

// クリック
const pianoKey = document.getElementsByClassName("pianokey");
for (i = 0; i < pianoKey.length; i++) {
  ((i) => {
    pianoKey[i].addEventListener(
      "click",
      () => {
        const hz = 440 * Math.pow(2, (1 / 12) * (i - 9));
        piano.play(hz);
      },
      false
    );
  })(i);
}

// キーボード
document.addEventListener("keyup", (e) => {
  if (e.key in piano.keys) {
    const hz = 440 * Math.pow(2, (1 / 12) * (piano.keys[e.key] - 9));
    piano.play(hz);
  }
});
