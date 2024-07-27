import express, { Router } from 'express';
import {roomController} from '../controllers/RoomController';

const router = express.Router();

router.get('/rooms',roomController.getAllRooms);
router.post('/create-room',roomController.createRoom);


export default router;