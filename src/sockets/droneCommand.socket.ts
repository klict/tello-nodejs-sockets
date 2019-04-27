import {createSocket, Socket} from "dgram";
import {TelloSocket} from "./telloSocket";

export class DroneCommandSocket implements TelloSocket {

    private readonly TELLO_COMMAND_CONNECTION_ADDRESS = '192.168.10.1';
    private readonly TELLO_COMMAND_CONNECTION_PORT = 8889;

    private telloSocketConnection: Socket;

    constructor(private socketIo: any) {
        this.telloSocketConnection = createSocket("udp4");
    }


    sendMessage(msg: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            console.log('command "' + msg + '" sent');
            // send command
            this.telloSocketConnection.send(msg, 0, msg.length, this.TELLO_COMMAND_CONNECTION_PORT, this.TELLO_COMMAND_CONNECTION_ADDRESS, error => {
                if (error) {
                    console.log('while sending following messagge"' + msg + '"  something went wrong');
                    console.log(error);
                    reject('something went wrong')
                }
            });

            // listen for response
            this.telloSocketConnection.on('message', (message, info) => {

                console.log("received response for the following message: " + message);
                console.log("info: ", info);

                resolve(message.toString());
            });
        });
    }

    initialize(socket: Socket): void {
        socket.on('command', (command: string) => {
            this.sendMessage(command).then(result => this.socketIo.sockets.emit('message', result.toString()));
        });
    }

}
