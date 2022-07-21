const mongoose = require('mongoose');
const schemaObj = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema({
    user_id: {
        type: schemaObj,
        ref: "User"
    },
    product: {
        type: schemaObj,
        ref: "Product"
    },
    product_name: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Cart", cartSchema);