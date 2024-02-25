import "dotenv/config"

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dataRoutes from './routes/data.js'

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));      //properly send a request. This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request.
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors({origin : "*"}));

app.use('/data',dataRoutes);

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)) )
    .catch((error) => console.log(error.message));

   







