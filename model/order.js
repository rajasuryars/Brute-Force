const mongoose = require('mongoose');
const cartSchema = require('./cart');
const schemaObj = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
    products: {type: Array, default: []},
    transaction_id: {},
    amount: { type: Number },
    address: String,
    updated: Date,
    user: {
        type: schemaObj,
        ref: "User"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);