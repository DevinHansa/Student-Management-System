const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection success!");
})

const studentRouter = require('./routes/student'); // Changed 'student' to 'studentRouter'

app.use("/student", studentRouter); // Now 'studentRouter' is defined

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
})

