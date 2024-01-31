import express from 'express';
import { getAllEvents, heyyo, getEvents, getEventById, addQuestionsToEvent, editEvent, deleteEvent } from '../controllers/eventController.js';
import { createEvent } from '../controllers/eventController.js';
const eventRoutes = express.Router();

eventRoutes.get('/', heyyo);
eventRoutes.post('/newevent', createEvent);
eventRoutes.get('/getall', getAllEvents);
eventRoutes.get('/getevents', getEvents);
eventRoutes.get('/geteventbyid/:id', getEventById);
eventRoutes.post('/addquestionstoevent', addQuestionsToEvent);
eventRoutes.put('/editevent/:id', editEvent);
eventRoutes.delete('/deleteevent/:id', deleteEvent);

export default eventRoutes;