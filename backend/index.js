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

const allowedOrigins = [
  "http://localhost:5001",          // local frontend
  "https://serene-cat-642896.netlify.app", // your deployed frontend
];
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Request origin:", origin); // debug

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // allow cookies/auth headers
  })
);


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