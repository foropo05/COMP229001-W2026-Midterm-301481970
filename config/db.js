require("dotenv").config();
const mongoose = require("mongoose");

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

module.exports = async function () {
  try {
    const connectionString = process.env.MONGODB_URI;

    if (!connectionString) {
      throw new Error("MONGODB_URI is not set in environment variables");
    }

    await mongoose.connect(connectionString, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("==== Backend successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    await mongoose.disconnect();
  }
};