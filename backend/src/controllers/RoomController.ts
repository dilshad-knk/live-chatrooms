import { Request, Response } from 'express';
import { roomService } from '../services/RoomService';
import { webSocketService } from '../services/WebSocketService';
import { ExtWebSocket } from '../models/ExtWebSocket';


export class RoomController {

    getAllRooms(req:Request,res:Response){
        const room = roomService.getAllRooms();
        res.json(room);
    };

    createRoom (req:Request,res:Response){
        
        const {username,roomName} = req.body;
       
        //creating room wwill return roomID
        
        const room = roomService.createRoom(roomName,username);

      

        res.json ({success: true, room})

    }

    joinRoom (ws:ExtWebSocket, data: { roomId: string; username: string }){
        const { roomId, username } = data;

       if(!username){
        return
       }
       
        const result = roomService.addUserToRoom(roomId, username);
        

        if (result.success) {
            ws.roomId = roomId;
            ws.username = username;
            ws.send(JSON.stringify({ type: 'joinRoomResponse', success: true, roomId,username }))
            this.broadcastRoomUpdate(roomId)

        } else {
            ws.send(JSON.stringify({ type: 'joinRoomResponse', success: false, message: 'Room not found' }))
        }

    }

    sendChatMessage(ws:ExtWebSocket,data:{message:string}){
       
       
        
        
        if(ws.roomId && ws.username){
            webSocketService.broadcastToRoom(ws.roomId,{
                type: 'chat',
                sender: ws.username,
                message: data.message,
                timestamp: new Date().toISOString(),
            })
        }
    }

   

    leaveRoom(ws:ExtWebSocket){
        if (ws.roomId && ws.username) {
            if (roomService.removeUserFromRoom(ws.roomId, ws.username)) {
              this.broadcastRoomUpdate(ws.roomId);
            }
          }
    }


    broadcastRoomUpdate(roomId: string) {
        const room = roomService.getRoom(roomId);
       
        

        if(room){
            webSocketService.broadcastToRoom(roomId,{
                type: 'roomUpdate',
                name: room.name,
                // users: Object.fromEntries(room.users)
                users:  Array.from(room.users.keys())

            })
        }

    }

}


export const roomController = new RoomController();