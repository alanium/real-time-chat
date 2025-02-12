require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const setupWebSocket = require('./services/websocket');

// Conectar a MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

// Servir archivos estáticos
app.use(express.static('public'));

// Inicializar WebSocket
setupWebSocket(server);
