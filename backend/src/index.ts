// 
import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import { initWebSocketService } from './services/WebSocketService';
import roomRoutes from './routes/roomRoutes';

const app = express();

app.use(bodyParser.json());
app.use(cors({
  credentials: true,
  origin: true,

}));

const server = http.createServer(app);

initWebSocketService(server );


app.use('/',roomRoutes)


 

// wss.on('connection', (ws) => {
//   ws.on('message', (message) => {
    
    
//     const data = JSON.parse(message.toString());
//     console.log(data);

// if(data.type === 'join') {
//         const {roomId,username} = data;

//         const room = rooms.get(roomId);


//         if(room){

//           room.users.add(username);


//          ws.send(JSON.stringify({ type: 'joinRoomResponse', success: true, roomId }));

//           wss.clients.forEach(client => {
//             if(client.readyState === WebSocket.OPEN) {
//               client.send(JSON.stringify({type:'roomUpdate' , roomId, users: Array.from(room.users)}));
//             } else {
//               ws.send(JSON.stringify({ type: 'joinRoomResponse', success: false, message: 'Room not found' }));
//             }
//           }) 
//         }
//     }
//   });
// });








server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});