const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', () => {
    console.log('🟢 Conectado al servidor WebSocket');
    ws.send(JSON.stringify({ user: "Alan", message: "Hola, probando conexión!" }));
});

ws.on('message', data => {
    const response = JSON.parse(data);
    console.log(`🤖 Servidor respondió: ${response.user}: ${response.message}`);
});

ws.on('close', () => console.log('🔴 Conexión cerrada'));
