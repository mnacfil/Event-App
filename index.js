require('dotenv').config();
// automatically catch the error in tryCatch 
require('express-async-errors');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');

const errorHandlerMiddleware = require('./middleware/error-handler')

//routes
const eventRoutes = require('./routes/eventRoutes')
const userRoutes = require('./routes/userRoutes')


// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api/v1/events', eventRoutes)
app.use('/api/v1/users', userRoutes)

app.use(errorHandlerMiddleware);

//notification
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to Database'));

//mongoose connection
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
// PORT
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));