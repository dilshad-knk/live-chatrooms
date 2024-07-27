import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import instance from '../axios/axios';

export default function JoinRooms() {
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await instance.get('/rooms');
        const data = response.data;
        console.log(data);
        
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div>
      <h2 className='p-4 text-center bg-green-500 text-red-700 font-extrabold text-2xl'>Available Rooms</h2>
      <ul className='p-4'>
        {rooms.map(room => (
          <li key={room.id} className='bg-red-700 text-white'>
            <Link to={`/room/${room.id}`}>{room.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
