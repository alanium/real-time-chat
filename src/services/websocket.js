const WebSocket = require('ws');
const { getChatHistory, saveMessage } = require('../controllers/chatController');

const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', async ws => {
        console.log('🟢 Nuevo cliente conectado');

        // Enviar historial de mensajes
        const messages = await getChatHistory();
        ws.send(JSON.stringify({ type: 'history', messages }));

        ws.on('message', async data => {
            const { user, message } = JSON.parse(data);
            console.log(`📩 ${user}: ${message}`);

            // Guardar y reenviar mensaje
            await saveMessage(user, message);
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'message', user, message }));
                }
            });
        });

        ws.on('close', () => console.log('🔴 Cliente desconectado'));
    });

    return wss;
};

module.exports = setupWebSocket;
