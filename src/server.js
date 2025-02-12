require('dotenv').config();
const express = require('express');
const WebSocket = require('ws');
const connectDB = require('./database');
const Message = require('./models/Message');

// Conectar a MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

app.use(express.static('public')); // Sirve archivos desde /public

// Configurar WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', async ws => {
    console.log('🟢 Nuevo cliente conectado');

    // Enviar historial de mensajes al cliente
    const messages = await Message.find().sort({ timestamp: 1 }).limit(10);
    ws.send(JSON.stringify({ type: 'history', messages }));

    ws.on('message', async data => {
        const { user, message } = JSON.parse(data);
        console.log(`📩 ${user}: ${message}`);

        // Guardar mensaje en MongoDB
        const newMessage = new Message({ user, message });
        await newMessage.save();

        // Enviar a todos los clientes conectados
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'message', user, message }));
            }
        });
    });

    ws.on('close', () => console.log('🔴 Cliente desconectado'));
});
