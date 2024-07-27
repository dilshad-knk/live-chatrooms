import WebSocket from 'ws';
import { ExtWebSocket } from '../models/ExtWebSocket';
import { roomController } from '../controllers/RoomController';
import { roomService } from './RoomService';

export class WebSocketService {

    private wss: WebSocket.Server

    constructor(server:any) {

        this.wss = new WebSocket.Server({server})

    }

    init() {
        this.wss.on('connection',this.handleConnection.bind(this))

    }


    private handleConnection(ws:ExtWebSocket) {
        ws.on('message', (message: string) => {
          const data = JSON.parse(message);
         switch(data.type){
            case 'join':
                roomController.joinRoom(ws,data);
                break;
            case 'chat':
                roomController.sendChatMessage(ws,data)
         }
        
        });

        ws.on('close', () => {
            roomService.clearRoom(ws)
          });
    }   


    broadcastToRoom(roomId: string, message: any) {
        this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {

        console.log('inside');

               
                client.send(JSON.stringify(message));
            }
        });
    }
      




}


export let webSocketService: WebSocketService;

export function initWebSocketService(server: any) {
  webSocketService = new WebSocketService(server);
  webSocketService.init();
}