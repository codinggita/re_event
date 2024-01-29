import express from 'express';
import { getAllEvents, heyyo, getEvents, getEventById } from '../controllers/eventController.js';
import { createEvent } from '../controllers/eventController.js';
const eventRoutes = express.Router();

eventRoutes.get('/', heyyo);
eventRoutes.post('/newevent', createEvent);
eventRoutes.get('/getall', getAllEvents);
eventRoutes.get('/getevents', getEvents);
eventRoutes.get('/geteventbyid/:id', getEventById);


export default eventRoutes;