// server.js
import express from "express";
import { config } from 'dotenv';
import { connect } from "mongoose";
import bodyParser from 'body-parser';
import cors from 'cors';
config()

// Import Routes
import routes from './routes/index.js';


const app = express();
const port = process.env.PORT || 8080;


// middleware
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());


// Routers
app.use('/api', routes)


// Kết nối với MongoDB
// 'mongodb+srv://luandhv1406:b5nc1RXh39L0rWMU@cluster.usnxw71.mongodb.net/';
connect(`${process.env.MONGODB_URI}`)
    .then(() => {
        console.log('Connected to MongoDB Success !');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log('Error to connecting to MongoDB !: ', err);
    })

