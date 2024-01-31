import EventModel from '../models/event.js';
// import UserModel from '../models/user.js';
import UserModel from '../models/User.js';
import { nanoid } from 'nanoid';
import { ObjectId } from 'mongodb';
import { createHash } from 'crypto';

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
        res.status(201).json(
            {
                "message": "Successfully added new event!",
                "eventcode": eventCode,
            }
        );
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
        const event = await EventModel.findOne({ eventcode: id });
        res.status(200).json(event);

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



export const registerUserForEvent = async (req, res) => {
    const { eventcode } = req.params;
    const { userid, email } = req.body;

    try {
        // Find the user by ID
        const user = await UserModel.findOne({ _id: userid });

        // Check if the user is found
        if (!user) {
            return res.status(206).json({ error: 'User not found.' });
        }

        // Check if the event is already registered
        if (user.registeredEvents.includes(eventcode)) {
            return res.status(205).json({ message: 'User is already registered for this event.' });
        }

        // Update the user model to add the registered event
        // await UserModel.updateOne({ _id: userid }, { $push: { registeredEvents: eventcode } });

        res.status(200).json({ message: 'Successfully registered for event!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// export const checkregisterevent = async (req, res) => {
//     const { eventcode } = req.params;
//     const { userid, email } = req.body;

//     try {
//         // Find the user by ID
//         const user = await UserModel.findOne({ _id: userid });

//         // Check if the user is found
//         if (!user) {
//             return res.status(206).json({ error: 'User not found.' });
//         }

//         // Check if the event is already registered
//         if (user.registeredEvents.some(event => event.eventcode === eventcode)) {
//             return res.status(205).json({ message: 'User is already registered for this event.' });
//         }

//         // Update the user model to add the registered event
//         // await UserModel.updateOne({ _id: userid }, { $push: { registeredEvents: { eventcode } } });

//         res.status(200).json({ message: 'Successfully registered for event!' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

export const neweventAddUser = async (req, res) => {
    const { eventcode } = req.params;
    const { _uid, email } = req.body;
    const qrUniqueCode = nanoid(8);
    console.log(eventcode, _uid, email)

    try {
        // Find the event by eventcode
        const event = await EventModel.findOne({ eventcode });
        // console.log(event)
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Check if the user is already registered for the event
        const isUserAlreadyRegistered = event.registeredUsers.find(
            (user) => user.email === email
        );

        if (isUserAlreadyRegistered) {
            return res
                .status(205)
                .json({ message: 'User is already registered for this event' });
        }
        // Add the user to the registeredUsers array
        const hashedQRCode = createHash('sha256').update(qrUniqueCode).digest('hex');

        const updatedEvent = await EventModel.updateOne(
            { eventcode },
            {
                $addToSet: {
                    registeredUsers: {
                        userid: _uid,
                        qrUniqueCode: hashedQRCode,
                        email,
                    },
                },
            }
        );
        // Check if the user was successfully added to the Event model
        if (updatedEvent.modifiedCount > 0) {
            // Add the hashed QR code to the User model
            const updatedUser = await UserModel.updateOne(
                { _id: _uid },
                {
                    $addToSet: {
                        registeredEvents: {
                            eventcode: eventcode,
                            qrUniqueCode: hashedQRCode,
                        },
                    },
                }
            );

            if (updatedUser.modifiedCount > 0) {
                res.status(200).json({ message: 'User registered for the event successfully', hashedQRCode });
            } else {
                // Handle the case where the User model update failed
                res.status(206).json({ message: 'User registration failed in the User model' });
            }
        } else {
            res.status(206).json({ message: 'Event not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const checkuserev = async (req, res) => {

    const { eventcode, userId } = req.params;
    // const { _id  } = req.body;
    // console.log(eventcode,userId)
    try {
        const user = await UserModel.findOne({ _id: userId });
        // console.log(user)
        //check for the eventcode in the registeredEvents array
        if (user.registeredEvents.includes(eventcode)) {
            return res.status(205).json({ message: 'User is already registered for this event.' });
        }
        else {
            return res.status(200).json({ message: 'User is not registered for this event.' });
        }

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

