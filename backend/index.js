import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const port = 3000;
import mongoose from 'mongoose';
import router from './routes/route.js';
import eventRoutes from './routes/eventRoutes.js';
import cors from 'cors';
app.use(express.json());

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use('/', router);
app.use('/events', eventRoutes);


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB 🥳');
}).catch((err) => {
    console.log(err);
}
);

app.listen(port, () => console.log(`yowamio listening on port ${port}!`));