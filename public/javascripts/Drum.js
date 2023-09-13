class Drum {
  play(src) {
    const source = audioCtx.createBufferSource();
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

    source.connect(audioCtx.destination);
    source.start(0);
  }
}
