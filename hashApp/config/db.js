const mongoose = require("mongoose");
require("dotenv").config() //load .env variables into process.env

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_CONNECTION);
        console.log("MongoDb connected successfully")
    }catch(error){
        console.log("Mongo connection failed", error.message)
        process.exit(1)
    }
}
module.exports = connectDB