import express from 'express';
import { getHello } from '../controllers/controller.js';
import { sendOtp,verifyOtp,getProfile ,setUsername,getProfile2} from '../controllers/LoginController.js';
const router = express.Router();

router.get('/', getHello);


router.post('/send-otp',sendOtp);
router.post('/verify-otp',verifyOtp);
router.get('/me',getProfile);
router.get('/me2',getProfile2);

router.post('/setusername',setUsername);

export default router;