import EventModel from '../models/event.js';
import { nanoid } from 'nanoid';

export const heyyo = async (req, res) => {
    res.send('Heyyo wassup!');
}

export const createEvent = async (req, res) => {
    try {
        const eventCode = nanoid(6);
        const newEvent = new EventModel({
            ...req.body,
            eventcode: eventCode,
        });
        const savedEvent = await newEvent.save();
        console.log('Successfully added new event!');
        res.status(201).json("yo man! you created a new event");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getAllEvents = async (req, res) => {
    try {
        const events = await EventModel.find();
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getEvents = async (req, res) => {
    try {
        const events = await EventModel.find({}, { eventname: 1, eventdate: 1, eventtime: 1, _id: 0, eventcreatedby: 1, eventstatus: 1, description: 1, eventbanner: 1, eventlocation: 1, eventcode: 1 });
        res.status(200).json(events);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export const getEventById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const event = await EventModel.findOne({ eventcode: id });
        res.status(200).json(event);
        console.log(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const addQuestionsToEvent = async (req, res) => {
    try {
        const { eventcode, questions } = req.body;
        const existingEvent = await EventModel.findOne({ eventcode });

        if (!existingEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        existingEvent.questions = [...existingEvent.questions, ...questions];
        const updatedEvent = await existingEvent.save();
        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const editEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedEvent = await EventModel.findOneAndUpdate(
            { eventcode: id },
            { $set: req.body },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        console.log('Successfully updated event:', updatedEvent);
        res.status(200).json('Event updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedEvent = await EventModel.findOneAndRemove({ eventcode: id });

        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};