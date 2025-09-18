const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name:{type: String, required: true, max: 30},
    price:{type: Number, required: true},
    description:{type: String, optional: true },
    category:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        required: true
    },
    stockKeepingUnit:{type: Number, required:true},
    productImages:{type: String},
    condition:{
        type: String,
        enum: ["new", "used", "refurbished"],
        required: true
    },
    status: {
        type: String,
        enum: ["active", "out-of-stock", "archived"],
        required: true
    },
    inStock:{type:Boolean, default: true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    }, { timestamps : true}   
)
console.log('Product model created successfully')

const product = mongoose.model('Product', productSchema)
module.exports = product;
