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
  origin: function(origin, callback) {
    // allow requests with no origin (like curl, Postman) or same-origin server calls
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('CORS not allowed by server'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// make sure express can answer preflight quickly
app.options('*', cors());

app.use((req, res, next) => {
  console.log('Request origin:', req.headers.origin);
  console.log('Cookies sent:', req.headers.cookie);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/',staticRoutes);
app.use('/create',createRoute);
app.use('/quiz',getallRoute)

app.listen(PORT,()=>console.log(`Server Started on port ${PORT}`));