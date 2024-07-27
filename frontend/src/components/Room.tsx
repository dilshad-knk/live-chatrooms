import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { VscSend } from "react-icons/vsc";
import SetUserName from './SetUserName';
import { FaRegEye, FaUsers } from 'react-icons/fa';
import { MdDoubleArrow } from 'react-icons/md';


interface Message {
    sender: string;
    message: string;
    timestamp: string;
    isSelf: boolean;
}

export default function Room() {
    const location = useLocation();

    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [userName, setUserName] = useState<string>(location.state?.username || '');
    const [users, setUsers] = useState<string[]>([]);
    const [roomName, setRoomNaame] = useState<string>('');
    const { roomId } = useParams();
    const websocket = useRef<WebSocket | null>(null);






    console.log(messages, 'mmmmmmmmmmmmmmmmmmmmmm');





    useEffect(() => {
        websocket.current = new WebSocket('ws://localhost:8080');

        websocket.current.onopen = () => {
            websocket.current?.send(JSON.stringify({ type: 'join', roomId, username: userName }));
        };

        websocket.current.onmessage = (event) => {
            const data = JSON.parse(event.data);

            console.log(data, 'data outside');



            if (data.type === 'roomUpdate') {
                setUsers(data.users);
                setRoomNaame(data.name)





            }

            if (data.type === 'chat') {
                console.log(data, 'data chat');
                setMessages(prevMessages => [...prevMessages, {
                    sender: data.sender,
                    message: data.message,
                    timestamp: data.timestamp,
                    isSelf: data.sender === userName

                }]);





            }


        };

        websocket.current.onclose = () => {
            console.log('WebSocket disconnected');
        };

        websocket.current.onerror = (error) => {
            console.error('WebSocket error', error);
        };


        return () => {
            websocket.current?.close();
        };
    }, [roomId, userName]);

    if (!userName) {
        return <SetUserName setUserName={setUserName} />;
    }

    const sendMessage = () => {
        if (inputMessage && websocket.current && websocket.current.readyState === WebSocket.OPEN) {

            const messageData = {
                type: 'chat',
                sender: userName,
                message: inputMessage,

            };

            websocket.current.send(JSON.stringify(messageData));



            setInputMessage('');

        } else {
            console.log("failed to send");
        }
    }




    return (


        <div className='flex flex-col h-screen bg-gray-100'>
            <div className="flex-1 overflow-hidden flex flex-col">
                <div className=' bg-green-900 text-white flex justify-between p-4'>
                    <div className="text-2xl font-bold flex items-center ">
                        <span className='bg-green-600 p-2  '>
                            Title
                        </span>
                        <MdDoubleArrow className='size-16 text-green-600' />
                        {roomName}
                    </div>
                    <button className='bg-red-600 my-4 px-4 rounded'>
                        Exit
                    </button>

                </div>
                <div className='flex justify-center p-3'>
                    <div className='flex flex-col justify-center items-center font-bold text-xs bg-green-200 py-1 px-3'>
                        {/* <FaUsers/> {users.length} */}

                        <div className='flex items-center gap-1'>
                            <FaRegEye /><span className='font-medium'> {users.length}</span>
                        </div>
                        {/* <MdOutlineArrowDropDown /> */}

                    </div>

                </div>
                <div className='flex-1 overflow-y-auto p-4'>
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`mb-2 p-2 rounded-lg ${message.isSelf
                                    ? 'bg-blue-500 text-white self-end'
                                    : 'bg-white text-black self-start'
                                }`}
                        >
                            <div className="font-bold">
                                {message.isSelf ? 'You' : message.sender.substr(0, 4)}
                            </div>
                            <div>{message.message}</div>
                            <div className="text-xs text-gray-500">
                                {new Date(message.timestamp).toLocaleTimeString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white p-4 border-t">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        className='flex-1 border-2 border-gray-300 rounded-lg p-2 focus:border-green-500 focus:outline-none'
                        placeholder="Type a message..."
                    />
                    <button
                        className='p-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors'
                        onClick={sendMessage}
                    >
                        <VscSend className='size-6' />
                    </button>
                </div>
            </div>
        </div>
    );
}
