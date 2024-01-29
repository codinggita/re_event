import express from 'express';
import { getHello } from '../controllers/controller.js';
import { sendOtp,verifyOtp,getProfile } from '../controllers/LoginController.js';
const router = express.Router();

router.get('/', getHello);


router.post('/send-otp',sendOtp);
router.post('/verify-otp',verifyOtp);
router.get('/me',getProfile);


export default router;