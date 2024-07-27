import { v4 as uuidv4 } from 'uuid';
import { Room, RoomDto } from "../models/Room";
import { ExtWebSocket } from '../models/ExtWebSocket';
import e from 'express';

export class RoomService {

  private rooms: Map<string, Room> = new Map()


  createRoom(roomName: string, username: string) {

    const roomId = uuidv4();

    const room: Room = {
      id: roomId,
      name: roomName,
      users: new Map([[username, { isAdmin: true }]])
    }

    this.rooms.set(roomId, room);



    return { roomId, username };

  };

  getRoom(roomId: string): Room | undefined {
    return this.rooms.get(roomId);
  };




  addUserToRoom(roomId: string, username: string, isAdmin: boolean = false): { success: boolean, message?: string } {
    const room = this.rooms.get(roomId);


    if (room) {

      if (this.isAdmin(room, username)) {

        return { success: true, message: 'Admin' };


      } else if (room.users.has(username)) {

        return { success: false, message: 'Username already exists in this room. Please choose another.' };

      } else {

        room.users.set(username, { isAdmin });

        return { success: true };

      }

    }

    return { success: false, message: 'Room not found' };
  };


  removeUserFromRoom(roomId: string, username: string): boolean {
    const room = this.rooms.get(roomId);
    if (room) {
      room.users.delete(username);
      if (room.users.size === 0) {
        this.rooms.delete(roomId);
      }
      return true;
    }
    return false;
  }

  getAllRooms(): RoomDto[] {
   

    return Array.from(this.rooms.values()).map(room => ({
      id: room.id,
      name: room.name,
      userCount: room.users.size
    }));
  }

  isAdmin(room: Room, username: string): Boolean {
    const user = room.users.get(username)

    return user?.isAdmin || false
  }

  clearRoom(ws:ExtWebSocket){
    const room = this.rooms.get(ws.roomId);
   if(room){

      if(this.isAdmin(room,ws.username)){
        this.rooms.delete(ws.roomId);
      } else {
        
      }



   } else {

      console.log('no room found');
      
   }


}


}

export const roomService = new RoomService()