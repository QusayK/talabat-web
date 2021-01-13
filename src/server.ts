import morgan from 'morgan';
import fs from 'fs';
import path, { join } from 'path';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';

// Routes Imports
import auth from './routes/auth';
import restaurant from './routes/restaurant';
import menu from './routes/menu';
import user from './routes/user';
import order from './routes/order';
import rating from './routes/rating';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Expose-Headers": "x-auth",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "http://localhost:4200",
}));


app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, '../access.log'), {flags: 'a'})
}));

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/api/auth', auth);
app.use('/api/restaurant', restaurant);
app.use('/api/menu', menu);
app.use('/api/user', user);
app.use('/api/order', order);
app.use('/api/rating', rating);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));