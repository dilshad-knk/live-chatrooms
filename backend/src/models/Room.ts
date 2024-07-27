export interface Room {
    id: string;
    name: string;
    users: Map<string,User>;
  }

  interface User {
    isAdmin: boolean;
  }

  
  export interface RoomDto {
    id: string;
    name: string;
    userCount: number;
  }