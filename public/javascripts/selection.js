const socket = io();
const room = location.search.substring(6, 11);
console.log(room);
socket.on("connect", () => {
  socket.emit("joinRoom", room);
});
const instruments = [
    {id:"piano", path:"./onPiano"},
    {id:"guitar", path:"./onGuitar"},
    {id:"bass", path:"#"},
    {id:"drum", path:"./onDrum"},
]
instruments.forEach((instrument)=>{
    document.getElementById(instrument.id).addEventListener("click",function(){
        window.location.href = `${instrument.path}?room=${room}`;
    })
})


