const rooms = [
    { id: 'Room_1', password: 'pass1', participants: 0, names: [] },
    { id: 'Room_2', password: 'pass2', participants: 20, names: ['User 1', 'User 2'] },
    { id: 'Room_3', password: 'pass3', participants: 0, names: [] },
    { id: 'Room_4', password: 'pass4', participants: 0, names: [] },
    { id: 'Room_5', password: 'pass5', participants: 0, names: [] },
    { id: 'Room_6', password: 'pass6', participants: 0, names: [] },
    { id: 'Room_7', password: 'pass7', participants: 0, names: [] },
    { id: 'Room_8', password: 'pass8', participants: 0, names: [] },
    { id: 'Room_9', password: 'pass9', participants: 0, names: [] },
    { id: 'Room_10', password: 'pass10', participants: 0, names: [] }
];

let currentRoom = null;

const maxParticipants = 20;

function renderRooms() {
    const roomList = document.getElementById('roomList');
    roomList.innerHTML = ''; 
    rooms.forEach((room, index) => {
        const roomDiv = document.createElement('div');
        roomDiv.classList.add('room');
        roomDiv.innerHTML = `
            <div class="room-info">
                <span>Room ID: ${room.id}</span>
                <span id="${room.id}-count">Participants: ${room.participants}/${maxParticipants}</span>
            </div>
            <button id="button-${room.id}">
                ${currentRoom && currentRoom.id === room.id ? 'Exit' : 'Enter'}
            </button>
        `;
        
        const button = roomDiv.querySelector(`#button-${room.id}`);
        button.onclick = () => {
            if (currentRoom && currentRoom.id === room.id) {
                leaveRoom(room);
            } else if (!currentRoom) {
                if (room.participants >= maxParticipants) {
                    alert("Maximum members reached. Please apply to join.");
                } else {
                    const userName = prompt("Enter your name:");
                    if (userName) {
                        room.participants++;
                        room.names.push(userName);
                        currentRoom = room;
                        window.location.href = `room.html?id=${room.id}&participants=${room.participants}&names=${encodeURIComponent(room.names.join(','))}`;
                    }
                }
            } else {
                alert(`You are already in ${currentRoom.id}. Please leave the room before entering another.`);
            }
        };

        roomList.appendChild(roomDiv);
    });
}

function leaveRoom(room) {
    room.participants--;
    const index = room.names.indexOf(currentRoom.names[currentRoom.names.length - 1]);
    if (index > -1) {
        room.names.splice(index, 1);
    }
    currentRoom = null; 
    alert(`You have left ${room.id}.`);
    updateRoomDisplay(room);
}

function updateRoomDisplay(room) {
    document.getElementById(`${room.id}-count`).textContent = `Participants: ${room.participants}/${maxParticipants}`;
    renderRooms();
}

renderRooms();

function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('open');
  }
