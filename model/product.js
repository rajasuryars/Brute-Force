const mongoose = require('mongoose');
const schemaObj = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 200
    },
    photo: {
        type: String,
        trim: true,
        required: true,
        maxlength: 200
    },
    category: {
        type: schemaObj,
        ref: "Category"
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    soldQty: {
        type: Number,
        default: 0
    },
    visibility: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);