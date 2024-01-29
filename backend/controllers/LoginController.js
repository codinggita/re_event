import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import OtpModel from '../models/otpModel.js';
import UserModel from '../models/User.js';

import jwt from 'jsonwebtoken';
// export { jwt };
async function sendVerificationEmail(email, otp) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'top10world1210@gmail.com',
        pass: 'izgm dfzw vxri uajf',
      },
    });

    const mailOptions = {
      from: 'top10world1210@gmail.com',
      to: email,
      subject: 'Passwordless Login OTP',
      text: `Your OTP for login is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    console.log('OTP sent successfully');
  } catch (error) {
    console.error(error);
    // Handle the error appropriately (e.g., log it, return an error response)
  }
}

async function generateUniqueOtp() {
  let otp = otpGenerator.generate(5, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  let result = await OtpModel.findOne({ otp });

  while (result) {
    otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
    });
    result = await OtpModel.findOne({ otp });
  }

  return otp;
}

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  let otp; // Define otp variable here

  try {
    // const checkUserPresent = await UserModel.findOne({ email });


    // if (checkUserPresent) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'User is already registered',
    //   });
    // }

    // Check if an OTP document with the same email already exists
    const existingOtp = await OtpModel.findOne({ email });

    if (existingOtp) {
      // Update the existing OTP document instead of creating a new one
      otp = await generateUniqueOtp();
      existingOtp.otp = otp;
      await existingOtp.save();
    } else {
      // Create a new OTP document
      otp = await generateUniqueOtp();
      const newOtp = new OtpModel({ email, otp });
      await newOtp.save();
    }

    // Send verification email
    await sendVerificationEmail(email, otp);

    res.status(200).send('OTP sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the user by email
    const existingUser = await UserModel.findOne({ email });

    const otpDocument = await OtpModel.findOne({ email, otp });

    if (otpDocument && otpDocument.email === email && otpDocument.otp === otp) {
      // OTP verification successful

      if (!existingUser) {
        // If the user does not exist, create a new user
        const newUser = new UserModel({ email });
        await newUser.save();
      }

      // Retrieve the user (whether existing or newly created)
      const user = await UserModel.findOne({ email });

      // Or, generate a JWT
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET, // Use the imported secret from config.js
        { expiresIn: '1h' } // Token expiration time, adjust as needed
      );

      // Create a session
      req.session.user = {
        userId: user._id,
        email: user.email,
      };

      res.status(200).json({
        success: true,
        message: 'OTP verification successful',
        token: token, // Include the token in the response
        user: {
          userId: user._id,
          email: user.email,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid OTP',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
export const getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

     const decodedjwt = jwt.decode(token,process.env.JWT_SECRET);
    console.log(decodedjwt);


    const user = await UserModel.findById(req.userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
       decodedjwt:decodedjwt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
