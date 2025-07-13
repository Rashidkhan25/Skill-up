async function requestMediaAccess() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        console.log("Media access granted", stream);
    } catch (error) {
        console.error("Error accessing media devices.", error);
    }
}

function displayRoomDetails() {
    const params = new URLSearchParams(window.location.search);
    const roomId = params.get('id');
    const participantsCount = params.get('participants');
    const names = params.get('names') ? decodeURIComponent(params.get('names')).split(',') : [];

    const roomDetailsDiv = document.getElementById('roomDetails');
    roomDetailsDiv.innerHTML = `
        <p>Room ID: ${roomId}</p>
        <p>No of Participants: ${participantsCount}</p>
        <p>Participants: ${names.join(', ')}</p>
    `;
}

document.getElementById('joinNowBtn').addEventListener('click', () => {
    requestMediaAccess(); 
});

displayRoomDetails();
