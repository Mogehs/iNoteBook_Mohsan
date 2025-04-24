const mongoose = require('mongoose');
const uri= process.env.Atles_URT
const ConnectDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log('connection successful');
  } catch (error) {
    console.error(error);
  }
};

module.exports = ConnectDb;
