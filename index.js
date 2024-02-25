import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dataRoutes from './routes/data.js'

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));      //properly send a request. This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request.
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/data',dataRoutes);

const PORT = process.env.PORT || 5000;


mongoose.connect('mongodb+srv://moniskhandx:interntaskmonis@interntask.ojnmzzi.mongodb.net/?retryWrites=true&w=majority&appName=interntask')
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)) )
    .catch((error) => console.log(error.message));

   







