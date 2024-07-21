const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const createEvent  = require('./Routes/event');


const app = express();
const port = 3000;
dotenv.config()

const connect = async() => {
    console.log(process.env.MONGO_URI); 
    try {
       await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
       })
 
       console.log('MongoDB connected')
    } catch (error) {
       console.log(error); 
       console.log('MongoDB connection failed')
    }
 }
 


app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/api/v1/events",createEvent)


app.listen(port, () => {
    connect();
    console.log(`Server is running on http://localhost:${port}`);
});
