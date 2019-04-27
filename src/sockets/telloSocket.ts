import {Socket} from 'dgram';

export interface TelloSocket {

    initialize(socket: Socket): void;
}


