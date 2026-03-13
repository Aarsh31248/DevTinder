const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://starfire9599_db_user:VAcGKuHx30876KsW@nodeproject.5o6lz1s.mongodb.net/devTinder",
  );
};

module.exports = connectDB;

   