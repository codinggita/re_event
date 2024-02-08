import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    username: {
        type: String,
        // required: true,
        trim: true,
        unique: true
    },
    registeredEvents: [
        {
            eventcode: {
                type: String,
            },
            qrUniqueCode: {
                type: String,
            },
        },
    ],
    createdEvents: [
        {
            type: String,
        }
    ]
});
userSchema.path('username').default(null); 
const UserModel = model('user', userSchema);

export default UserModel;
