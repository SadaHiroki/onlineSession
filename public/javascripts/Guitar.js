class Guitar {
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
