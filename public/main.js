const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
    console.log('🟢 Conectado al servidor WebSocket');
};

ws.onmessage = event => {
    const data = JSON.parse(event.data);
    if (data.type === 'history') {
        data.messages.forEach(msg => addMessage(msg.user, msg.message));
    } else {
        addMessage(data.user, data.message);
    }
};

function sendMessage() {
    const user = document.getElementById('user').value;
    const message = document.getElementById('message').value;
    ws.send(JSON.stringify({ user, message }));
}

function addMessage(user, message) {
    const chat = document.getElementById('chat');
    chat.innerHTML += `<p><strong>${user}:</strong> ${message}</p>`;
}
