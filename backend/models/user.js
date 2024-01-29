import mongoose, { model } from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
    email : {
        type: String,
        required : true,
        trim : true,
        unique : true
    },
    
});

const UserModel = model('user', userSchema);

export default UserModel;