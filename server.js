// server.js
const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

let numerosSorteados = [];

wss.on('connection', (ws) => {
    console.log('Cliente conectado.');

    // Envia os números sorteados atuais para novos clientes
    ws.send(JSON.stringify({ type: 'history', data: numerosSorteados }));

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'sortear') {
            if (numerosSorteados.length >= 180) {
                ws.send(JSON.stringify({ type: 'error', message: 'Todos os números já foram sorteados!' }));
                return;
            }

            let numero;
            do {
                numero = Math.floor(Math.random() * 180) + 1;
            } while (numerosSorteados.includes(numero));

            numerosSorteados.push(numero);

            // Envia o número sorteado para todos os clientes
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'newNumber', data: numero }));
                }
            });
        }
    });

    ws.on('close', () => {
        console.log('Cliente desconectado.');
    });
});

server.listen({
    port: 8080,
    host: '0.0.0.0'
});
