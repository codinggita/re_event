import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    eventname: {
        type: String,
        required: true
    },
    eventdate: {
        type: Date,
        required: true
    },
    eventtime: {
        type: String,
        required: true
    },
    eventbanner: {
        type: String
    },
    description: {
        type: String
    },
    eventcreatedby: {
        type: String,
        required: true
    },
    eventcode:{
        type: String
    },
    createddate: {
        type: Date,
        default: Date.now
    },
    eventticketprice: {
        type: Number,
        min: 0
    },
    eventtype: {
        type: String,
        enum: ['online', 'offline'],
    },
    eventurl: {
        type: String
    },
    eventlocation: {
        type: String
    },
    eventstatus: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed'],
        required: true
    },
    registrationstatus: {
        type: String,
        enum: ['open', 'closed'],
        required: true
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        required: true
    },
    questions: {
        type: [String]  
    },
    registeredUsers: [{
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        avatarImage: {
            type: String
        },
        answeredQuestions: {
            type: [String]
        },
        approveStatus: {
            type: Boolean,
            default: false
        },
        registeredDate: {
            type: Date,
            default: Date.now
        },
        checkinStatus: {
            type: Boolean,
            default: false
        }
    }]
});

const EventModel = mongoose.model('Event', EventSchema);

export default EventModel;