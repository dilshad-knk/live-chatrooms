import WebSocket from 'ws';

export interface ExtWebSocket extends WebSocket {
  roomId: string;
  username: string;
}