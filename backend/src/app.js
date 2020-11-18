const logger = require('morgan');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const employeeRouter = require('./routes/employees');
const performanceReviewRouter = require('./routes/performanceReviews');

const mongoURI = require('../config/keys').mongoSRV;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Successfully connected to DB');
})
.catch((err) => {
    console.error('Error connecting to DB:', err);
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/api', employeeRouter);
app.use('/api', performanceReviewRouter);

module.exports = app;
