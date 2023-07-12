require("dotenv").config();
const mongoose = require('mongoose');

const MONGO_DB_USERNAME = process.env.MONGO_DB_USERNAME;
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;

mongoose_connection_path = `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@cluster0.x52uqti.mongodb.net/`

// mongoose.connect(mongoose_connection_path, (err) => {
//     if (!err) { console.log('MongoDB connection succeeded.'); }
//     else { console.log('Error in MongoDB connection'); }
// });


const connectToMongo = async () => {
try {
    mongoose.set('strictQuery', false)
    mongoose.connect(mongoose_connection_path) 
    console.log('MongoDB connection succeeded.');
}
catch(error) {
    console.log(error)
    process.exit()
}
}
module.exports = connectToMongo;

