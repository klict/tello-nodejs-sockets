import {createSocket, Socket} from "dgram";
import {TelloSocket} from "./telloSocket";
import {Key} from "readline";

export class DroneVideoStreamSocket implements TelloSocket {

    private readonly TELLO_DRONE_VIDEO_STREAM_CONNECTION_ADDRESS = '192.168.10.1';
    private readonly TELLO_DRONE_VIDEO_STREAM_CONNECTION_PORT = 111111;

    private telloDroneSocket: Socket;
    private socketIoStream: any;

    constructor(private socketIo: any) {
        this.telloDroneSocket = createSocket("udp4");
        this.telloDroneSocket.bind(this.TELLO_DRONE_VIDEO_STREAM_CONNECTION_PORT);
        this.socketIoStream = require('socket.io-stream');
    }

    initialize(socket: Socket): void {

        //listen for state message from the drone
        this.telloDroneSocket.on('message', data => {
            console.log(data);
        })
    }



}
