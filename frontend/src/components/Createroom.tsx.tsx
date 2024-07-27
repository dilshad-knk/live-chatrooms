import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../axios/axios";



interface User {
    userName: string;
    date: Date;
    timestamp: string;
}




export function Createroom({}){


    const [username, setUsername] = useState<string >('');
    const [roomName, setRoomName] = useState<string >('');
    const navigate = useNavigate()





const handleCreateRoom = async() => {
  if (username && roomName) {
    try {
      const response = await instance.post('/create-room', {
        username,
        roomName,
      });
      
      const data = response.data; 
      console.log(data);

      if (data.success) {
       navigate(`/room/${data.room.roomId}`,{
        state : {username : data.room.username}
       });
      }
    } catch (error) {
      console.error('Error creating room:', error);
    }
  }
};





  
    return (
      <>
      <div className='shadow-md rounded px-8 pt-6 pb-8 mb-4 h-svh bg-green-900 flex flex-col justify-center'>
            <form className='bg-slate-50 p-3 rounded-lg shadow-md shadow-black'>
                 <h2 className='text-center mb-5 font-extrabold text-xl text-green-900'>New Room</h2>

                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomName">
                          Room Name
                      </label>
                      <input
                          id="roomName"
                          type="text"
                          className="bg-green-100 w-full py-2 px-1 ring-1 ring-green-300 rounded"
                          value={roomName}
                          onChange={(e) => setRoomName(e.target.value)}
                      />
                  </div>
                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                          Username
                      </label>
                      <input
                          id="username"
                          type="text"
                          className="bg-green-100 w-full py-2 px-2 ring-1 ring-green-300 rounded"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                      />
                  </div>
                 <div className="flex justify-center">
                 <button
                          className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={handleCreateRoom}
                      >
                          Create
                  </button>
                 </div>
            </form>
  
      </div>
          
      
      </>
    )
  
  }
  