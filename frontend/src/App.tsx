


import React, { useState, useEffect, useRef } from 'react';

import Signup from "./components/Signup"
import Banner from './components/Banner';
import { Link } from 'react-router-dom';

// interface Message {
//   sender: string;
//   message: string;
//   timestamp: string;
//   isSelf: boolean;
// }

function App() {
  // const [messages, setMessages] = useState<Message[]>([]);
  // const [inputMessage, setInputMessage] = useState('');
  // const [username, setUsername] = useState('');
  // const [isConnected, setIsConnected] = useState(false);
  // const [showUsernamePrompt, setShowUsernamePrompt] = useState(true);
  // const websocket = useRef<WebSocket | null>(null);
  // const [roomName,setRoomName] = useState([])
  // const [rooms,setRooms] = useState([])

  // useEffect(() => {
  //   if (username) {
  //     connectWebSocket();
  //   }
  // }, []);

  // const connectWebSocket = () => {
  //   websocket.current = new WebSocket('ws://localhost:8080');

  //   websocket.current.onopen = () => {
  //     console.log('WebSocket connected');
  //     setIsConnected(true);
  //     websocket.current?.send(JSON.stringify({ type: 'create', username }));
  //   };

  //   websocket.current.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { ...data, isSelf: data.sender === username }
  //     ]);
  //   };

  //   websocket.current.onclose = () => {
  //     console.log('WebSocket disconnected. Trying to reconnect...');
  //     setIsConnected(false);
  //     setTimeout(connectWebSocket, 3000);
  //   };

  //   websocket.current.onerror = (error) => {
  //     console.error('WebSocket error:', error);
  //   };
  // };

  // const sendMessage = () => {
  //   if (inputMessage && websocket.current && isConnected) {
  //     const messageData = {
  //       type: 'chat',
  //       sender: username,
  //       message: inputMessage,
  //       timestamp: new Date().toISOString()
  //     };
  //     websocket.current.send(JSON.stringify(messageData));
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { ...messageData, isSelf: true }
  //     ]);
  //     setInputMessage('');
  //   }
  // };

  // const handleUsernameSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (username.trim()) {
  //     setShowUsernamePrompt(false);
  //   }
  // };



  
  

  return (
   <>
      <div className=" bg-black h-svh flex flex-col gap-3 px-10 py-3">
        <Banner />
        <div className="flex flex-col gap-10 items-center border rounded-md justify-center h-full ">
          <Link
            to='/create-room'
            className=" bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-block"
          >
            Create a Room
          </Link>


          <Link
            to='/join-room'
            className="flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Ongoing Rooms
            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>

          </Link>
        </div>


      </div>
    
    
   
   </>
  );
}

export default App;



