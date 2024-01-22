import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const port = 3000;
import mongoose from 'mongoose';
import  router  from './routes/route.js';


app.use('/', router);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB 🥳');
}).catch((err) => {
    console.log(err);
}
);

app.listen(port, () => console.log(`yowamio listening on port ${port}!`));