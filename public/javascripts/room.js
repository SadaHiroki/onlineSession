const socket = io();
// const participantsList = document.getElementById('participantsList')

document.getElementById("joinForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const room = document.getElementById("roomNumberInput").value;
  socket.emit("joinRoom", room);
  socket.on("roomLimit", () => {
    alert("部屋数が最大です");
    return;
  });
  socket.on("roomLimitCapacity", () => {
    alert("部屋の参加人数が最大です");
    return;
  });
  socket.on("joinedRoom", () => {
    window.location.href = "/onSelection?room=" + room;
  });
});

// function displayParticipants(participants) {
//     participants.forEach(participant => {
//         const li = document.createElement('li');
//         li.innerText = participant;
//         participantsList.appendChild(li);
//     });
// }

// socket.on('roomParticipants', participants => {
//     displayParticipants(participants);
// })
