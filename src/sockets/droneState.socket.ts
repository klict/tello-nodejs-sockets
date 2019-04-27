import {createSocket, Socket} from "dgram";
import {TelloSocket} from "./telloSocket";
import {Key} from "readline";

export class DroneStateSocket implements TelloSocket {

    private readonly TELLO_DRONE_STATE_CONNECTION_ADDRESS = '192.168.10.1';
    private readonly TELLO_DRONE_STATE_CONNECTION_PORT = 8890;

    private telloDroneSocket: Socket;


    constructor(private socketIo: any) {
        this.telloDroneSocket = createSocket("udp4");
        this.telloDroneSocket.bind(this.TELLO_DRONE_STATE_CONNECTION_PORT);
    }

    initialize(socket: Socket): void {

        //listen for state message from the drone
        this.telloDroneSocket.on('message', state => {
            //convert incoming state string to object
            const parsedDroneState = this.parseState(state.toString());
            this.socketIo.sockets.emit('state', JSON.stringify(parsedDroneState));

        })
    }

    /**
     *  Parse drone state from string to object
     *
     * @param state drone state in string format
     */
    private parseState(state: string): { [key: string]: any } {
        // const droneState: String[] = state.split(';');
        let droneState: { [key: string]: any } = {};

        for (let stateProperty of state.split(';')) {
            let statePropertyArray: string[] = stateProperty.split(":");
            droneState[statePropertyArray[0]] = parseInt(statePropertyArray[1], 10);
        }

        return droneState;


    }


}
