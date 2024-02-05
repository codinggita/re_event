import EventModel from '../models/event.js';
import UserModel from '../models/User.js';
import { nanoid } from 'nanoid';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';


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
        const currentViews = event.views || 0;
        console.log(currentViews)

        const updatedEvent = await EventModel.findOneAndUpdate(
            { eventcode: id },
            { $set: { views: currentViews + 1 } },
            { new: true } // Return the updated document
        );

        await updatedEvent.save();
        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export const addQuestionsToEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { questions } = req.body;
        const existingEvent = await EventModel.findOne({ eventcode: id });

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



export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedEvent = await EventModel.findOneAndDelete({ eventcode: id });

        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const checkregisterevent = async (req, res) => {
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
        await UserModel.updateOne({ _id: userid }, { $push: { registeredEvents: eventcode } });

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

        const saltRounds = 10;
        const hashedQRCode = await bcrypt.hash(qrUniqueCode, saltRounds);


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

    try {
        const user = await UserModel.findOne({ _id: userId });

        if (!user) {
            return res.status(206).json({ error: 'User not found.' });
        }

        // Check if the eventcode is present in any element of the registeredEvents array
        const registeredEvent = user.registeredEvents.find(event => event.eventcode === eventcode);

        if (registeredEvent) {
            return res.status(200).json({ message: 'User is already registered for this event.', qrUniqueCode: registeredEvent.qrUniqueCode });
        } else {
            return res.status(205).json({ message: 'User is not registered for this event.' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}



export const editQuestionsForEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedEvent = await EventModel.findOneAndUpdate(
            { eventcode: id },
            { $set: { questions: req.body.questions } },
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


export const addEventToCreatorUser = async (req, res) => {
    try {
        const { creatorId, eventcode } = req.body;

        const creatorUser = await UserModel.findOne({ email: creatorId });

        if (!creatorUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isEventAlreadyAdded = creatorUser.createdEvents.includes(eventcode);

        if (isEventAlreadyAdded) {
            return res.status(205).json({ message: 'Event is already added to the creator user' });
        }

        await UserModel.updateOne({ email: creatorId }, { $push: { createdEvents: eventcode } });

        res.status(200).json({ message: 'Event added to the creator user successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const fetchCreatedEvents = async (req, res) => {
    try {
        const { emailId } = req.params;

        const creatorUser = await UserModel.findOne({ email: emailId });

        if (!creatorUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(creatorUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const qrscancall = async (req, res) => {
    const { id } = req.params;
    const { scannedData } = req.body;
    console.log(id, scannedData)



    try {

        const event = await EventModel.findOne({ eventcode: id });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const matchedUser = event.registeredUsers.find((user) => user.qrUniqueCode === scannedData);

        if (!matchedUser) {
            return res.status(200).json({ message: 'Unauthorized' });
        }



        if (matchedUser.approveStatus) {
            return res.status(200).json({ message: 'User already checked in', matchedUser });
        }

        matchedUser.approveStatus = true;
        matchedUser.checkinStatus = true;

        await event.save();

        return res.status(200).json({ message: 'User checked in', matchedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getcheckinusers = async (req, res) => {
    const { id } = req.params;
    console.log(id)

    try {
        const event = await EventModel.findOne({ eventcode: id });
        console.log(event)

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Filter registeredUsers with approveStatus as true
        const approvedUsers = event.registeredUsers.filter(
            (user) => user.approveStatus === true
        );


        res.status(200).json(approvedUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const addneweventtohost = async (req, res) => {
    const { userEmail, eventcode } = req.body;

    try {
        const user = await UserModel.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.createdEvents.includes(eventcode)) {
            return res.status(400).json({ error: 'Event code is already added to the user profile' });
        }

        user.createdEvents.push(eventcode);
        await user.save();

        res.status(200).json({ message: 'Event added to user successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const addnewhostotevent = async (req, res) => {
    const { eventcode, hostEmail } = req.body;

    try {
        const event = await EventModel.findOne({ eventcode });
        const email = await UserModel.findOne({ email: hostEmail })

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (event.eventcreatedby.includes(hostEmail)) {
            return res.status(400).json({ error: 'Host email is already added to the event' });
        }
        if(!email){
            return res.status(404).json({ error: 'Host not found' });
        }
        event.eventcreatedby.push(hostEmail);
        await event.save();

        res.status(200).json({ message: 'Host added to event successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};