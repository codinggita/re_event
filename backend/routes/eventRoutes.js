import express from 'express';

import { getAllEvents, heyyo, getEvents, getEventById, addQuestionsToEvent, editEvent, deleteEvent, 
    registerUserForEvent, checkregisterevent, neweventAddUser, checkuserev, editQuestionsForEvent, addEventToCreatorUser,
     fetchCreatedEvents,qrscancall,getcheckinusers,addnewhostotevent, addneweventtohost } from '../controllers/eventController.js';
import { createEvent } from '../controllers/eventController.js';
const eventRoutes = express.Router();

eventRoutes.get('/', heyyo);
eventRoutes.post('/newevent', createEvent);
eventRoutes.get('/getall', getAllEvents);
eventRoutes.get('/getevents', getEvents);
eventRoutes.get('/geteventbyid/:id', getEventById);
eventRoutes.post('/addquestionstoevent/:id', addQuestionsToEvent);
eventRoutes.put('/editevent/:id', editEvent);
eventRoutes.delete('/deleteevent/:id', deleteEvent);
eventRoutes.post('/registerUserForEvent/:eventcode', registerUserForEvent);
eventRoutes.get('/checkregisterevent/:eventcode/', checkregisterevent);
eventRoutes.post('/neweventAddUser/:eventcode',neweventAddUser );
eventRoutes.get('/checkuserev/:eventcode/:userId', checkuserev);
// eventRoutes.get('/trackEventPageView/:id',trackEventPageView)
eventRoutes.put('/editquestionsforevent/:id', editQuestionsForEvent);
eventRoutes.post('/addeventtocreatoruser',addEventToCreatorUser)
eventRoutes.get('/geteventsbyuserid/:emailId', fetchCreatedEvents);

eventRoutes.post('/qrscancall/:id',qrscancall);

eventRoutes.get('/getcheckinusers/:id', getcheckinusers);
eventRoutes.post('/addnewhostotevent', addnewhostotevent);
eventRoutes.post('/addneweventtohost', addneweventtohost);
export default eventRoutes;