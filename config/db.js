const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {

  if (isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.DATABASE_URL);

  isConnected = db.connections[0].readyState;

  console.log('MongoDB conectado');
};

module.exports = connectDB;
