const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    .then((res) => {
      console.log('db connected successfully');
     })
    .catch((err) => { console.log('err : ',err); });
  } catch (err) {
    console.log(`There is an error in connecting to the DB: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
