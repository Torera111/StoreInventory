const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type: String, required: true, max:30},
    email:{type:String, required: true, unique: true},
    password:{type: String, required: true}
})

const user = mongoose.model('User', userSchema)
module.exports = user;