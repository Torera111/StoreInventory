const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    reviewer: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'}, // OR seller if reviewing a user
    rating: {type: Number, min: 1,max: 5 },
    comment: {type: String},
    createdAt: {type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
