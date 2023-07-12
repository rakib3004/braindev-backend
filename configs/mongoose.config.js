require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME;
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;

mongoose_connection_path = `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@cluster0.x52uqti.mongodb.net/University`;



const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(mongoose_connection_path, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
          console.log("Mongodb Connected Successfully");
      }).catch((error) => {
          console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectToMongo;
