import express from 'express';
import { getAllEvents, heyyo, getEvents, getEventById, addQuestionsToEvent ,neweventAddUser,checkuserev} from '../controllers/eventController.js';
import { createEvent } from '../controllers/eventController.js';
const eventRoutes = express.Router();

eventRoutes.get('/', heyyo);
eventRoutes.post('/newevent', createEvent);
eventRoutes.get('/getall', getAllEvents);
eventRoutes.get('/getevents', getEvents);
eventRoutes.get('/geteventbyid/:id', getEventById);
eventRoutes.post('/addquestionstoevent', addQuestionsToEvent);
// eventRoutes.post('/registerUserForEvent/:eventcode', registerUserForEvent);
// eventRoutes.get('/checkregisterevent/:eventcode/', checkregisterevent);
eventRoutes.post('/neweventAddUser/:eventcode',neweventAddUser );
eventRoutes.get('/checkuserev/:eventcode/:userId', checkuserev);


export default eventRoutes;