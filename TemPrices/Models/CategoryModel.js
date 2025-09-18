const mongoose = require("mongoose");
const slug = require("slugiify");

const categorySchema = new mongoose.Schema({
name: { 
    type: String,
    required: true, 
    unique: true
},
description: { 
    type: String
},
itemType:{
    type: String,
    //'enum' restricts the value to only one of the listed options
    enum: ["Gadget & Electronics", "accessories", "Clothing", "Skin product", "wigs", "Perfumes"],
    required: true
},
createdAt: {
    type: Date, 
    default: Date.now
}
});

categorySchema.pre('save', function(next){
    this.slug = sluify 
})
const category = mongoose.model('Category', categorySchema)
module.exports = category;
