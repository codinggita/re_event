import mongoose from 'mongoose';

const { Schema } = mongoose;

const otpSchema = new Schema({
    email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60,
  },
});

const OtpModel = mongoose.model('Otp', otpSchema);

export default OtpModel;
