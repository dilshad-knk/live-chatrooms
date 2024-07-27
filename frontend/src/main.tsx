import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Createroom } from './components/Createroom.tsx.tsx';
import JoinRoom from './components/JoinRoom.tsx';
import Room from './components/Room.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/create-room",
    element: <Createroom/>,
  },
  {
    path: "/join-room",
    element: <JoinRoom/>,
  },
  {
    path: "/room/:roomId",
    element: <Room/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(

 
      <RouterProvider router={router} />
    
 
)
