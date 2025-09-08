require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./connection/dbconnect');
const staticRoutes = require('./routes/staticRoutes');
const cookieParser = require('cookie-parser');
const createRoute = require('./routes/createRoute');
const getallRoute = require('./routes/getallRoute')

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();
app.use(cors({
    origin:process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/',staticRoutes);
app.use('/create',createRoute);
app.use('/quiz',getallRoute)

app.listen(PORT,()=>console.log(`Server Started on port ${PORT}`));