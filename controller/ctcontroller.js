'use strict';
const User = require('../model/user');
const Product = require('../model/product');
const Category = require('../model/category');
const Cart = require('../model/cart');
const userInstance = new User();
exports.registerUser = function(req, res) {
    var payload = {
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "username": req.body.username,
        "email": req.body.email,
        "role": 1
    };
    var hashedPassword = userInstance.createSecurePassword(req.body.password);
    if (hashedPassword) {
        payload["password"] = hashedPassword["encryptedPassword"];
        payload["salt"] = hashedPassword["salt"];
    }
    const userDoc = new User(payload);
    userDoc.save(function(err, doc) {
        if (err) return err;
        res.redirect("/login");
    });
}
exports.addProduct = function (req, res) {
    var payload = {
        "productname": req.body.productname,
        "description": req.body.description,
        "photo": req.body.photo,
        "price": req.body.price,
        "stock": req.body.stock
    };
    const productDoc = new Product(payload);
 
    // Find category ID if name is provided
    Category.findOne({categoryname: req.body.category}, function(err, category) {
        if (err) return err;
        productDoc.save(function(err, doc) {
            if (err) return err;
        });
    });
}
exports.updateProduct = function (req, res) {}
exports.deleteProduct = function (req, res) {}
exports.addCategory = function (req, res) {
    const categoryDoc = new Category({"categoryname": req.body.categoryname});
    categoryDoc.save(function(err, doc) {
        if (err) return err;
        res.send("Inserted!");
    })
}
exports.listCategories = function (req, res) {
    Category.find({}, function(err, categories) {
        console.log(categories);
    });
    res.send("Ok");
}

exports.addItemsToCart = function (req, res) {
    var payload = {
        "user_id": req.body.user_id,
        "product": req.body.product,
        "product_name": req.body.product_name,
        "product_price": req.body.product_price
    };
    const cartDoc = new Cart(payload);
    cartDoc.save(function(err, doc) {
        if (err) return err;
        res.send("Success");
    });
}

exports.addProductPage = function (req, res) {

}