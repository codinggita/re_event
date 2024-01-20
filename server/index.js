import express from 'express';
const app = express();
const port = 3000;
import  router  from './routes/route.js';


app.use('/', router);

app.listen(port, () => console.log(`yowamio listening on port ${port}!`));