const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    lastname: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    username: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 1
    },
    purchases: {
        type: Array,
        default: []
    },
    wishlist: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

userSchema.methods = {
    isPasswordValid: function(password, encryptedPassword, salt) {
        return (encryptedPassword == crypto.pbkdf2Sync(password, salt, iterations=10000, keylen=64, digest='sha512').toString('base64'));
    },
    createSecurePassword: function(password) {
        let encryptedPassword, salt;
        if (password) {
            salt = crypto.randomBytes(128).toString('base64');
            encryptedPassword = crypto.pbkdf2Sync(password, salt, iterations=10000, keylen=64, digest='sha512').toString('base64');
            return {"salt": salt, "encryptedPassword": encryptedPassword};
        }
    }
}

module.exports = mongoose.model("User", userSchema);