class Guitar {
  guitars = [
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
  codes = {
    a: [0, 2, 2, 2, 0],
    A: [1, 3, 3, 3, 1],
    b: [2, 4, 4, 4, 2],
    c: [0, 1, 0, 2, 3],
    C: [4, 6, 6, 6, 4],
    d: [2, 3, 2, 0],
    D: [6, 8, 8, 8, 6],
    e: [0, 0, 1, 2, 2, 0],
    f: [1, 1, 2, 3, 3, 1],
    F: [2, 2, 3, 4, 4, 2],
    g: [3, 0, 0, 0, 2, 3],
    G: [4, 4, 5, 6, 6, 4],
    m: {
      a: [0, 1, 2, 2, 0],
      A: [1, 2, 3, 3, 1],
      b: [2, 3, 4, 4, 2],
      c: [3, 4, 5, 5, 3],
      C: [4, 5, 6, 6, 4],
      d: [1, 3, 2, 0],
      D: [6, 7, 8, 8, 6],
      e: [0, 0, 0, 2, 2, 0],
      f: [1, 1, 1, 3, 3, 1],
      F: [2, 2, 2, 4, 4, 2],
      g: [3, 3, 3, 5, 5, 3],
      G: [4, 4, 4, 6, 6, 4],
    },
  };
  play(src, i) {
    const source = audioCtx.createBufferSource();
    const gainNode = audioCtx.createGain();
    const request = new XMLHttpRequest();
    request.open("GET", src, true);
    request.responseType = "arraybuffer";
    request.send();

    request.onload = () => {
      const res = request.response;
      audioCtx.decodeAudioData(res, (buf) => {
        source.buffer = buf;
      });
    };
    source.playbackRate.value = Math.pow(2, i / 12);
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    gainNode.gain.value = 0.2;
    source.start(0);
  }
}
