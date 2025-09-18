const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
    name:{type: String, required: true, max:30},
    email:{type:String, required: true, unique: true},
    password:{type: String, required: true},
    storeName:{type: String, required: false},
    contactNumber:{type: String},
    storeDescription:{type: String},
    profileImage:{type: String},
    isVerified: {type: Boolean, default: false},
    joinDate: {type: Date, default: Date.now}
})
console.log("Seller Model created successfully")
const seller = mongoose.model('Seller', sellerSchema)
module.exports = seller;