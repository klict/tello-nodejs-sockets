import express = require('express');
import {DroneCommandSocket} from "./src/sockets/droneCommand.socket";
import {TelloSocket} from "./src/sockets/telloSocket";
import {DroneStateSocket} from "./src/sockets/droneState.socket";

const app: express.Application = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const telloSockets: TelloSocket[] = [
    new DroneCommandSocket(io),
    new DroneStateSocket(io)
];

/**
 * Sending  "command" message to active sdk mode
 */
//(new DroneCommandSocket(io)).sendMessage('command').then().catch();

/**
 *  For each new connection
 */
io.on('connection', function (socket: any) {
    for (let telloSocket of telloSockets) {
        telloSocket.initialize(socket);
    }
});

server.listen(7000, () => {
    console.log('server is up and listening');
});

const telloCommandConnection = new DroneCommandSocket(io);

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.on("line", (input: string) => {
    telloCommandConnection.sendMessage(input);
});
