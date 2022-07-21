'use strict';
const Product = require('../model/product');
const Cart = require('../model/cart');
const Category = require('../model/category');
const Order = require('../model/order');
module.exports = function(app, passport) {
    const ctcontroller = require('../controller/ctcontroller');
    app.get("/", function (req, res) {
        if (req.user) {
            if (req.user.role == 0) {
                Product.find({}, function(err, products) {
                    req.products = products;
                    Category.find({}, function(err, categories) {
                        req.categories = categories;
                        res.render("../view/launchpad", {
                            user: req.user,
                            products: req.products,
                            categories: req.categories
                        });
                    });
                });
            } else {
                Product.find({visibility: true}, function(err, products) {
                    req.products = products;
                    Category.find({}, function(err, categories) {
                        req.categories = categories;
                        res.render("../view/launchpad", {
                            user: req.user,
                            products: req.products,
                            categories: req.categories
                        });
                    });
                });
            }
        } else {
            Product.find({visibility: true}, function(err, products) {
                req.products = products;
                Category.find({}, function(err, categories) {
                    req.categories = categories;
                    res.render("../view/launchpad", {
                        user: {},
                        products: req.products,
                        categories: req.categories
                    });
                });
            });
        }
    });
    app.get("/view/:view_name", function (req, res) {
        res.render("../view/" + req.params.view_name);
    });
    app.get("/logout", function (req, res) {
        req.logout();
        Product.find({visibility: true}, function(err, products) {
            req.products = products;
            Category.find({}, function(err, categories) {
                req.categories = categories;
                res.render("../view/launchpad", {
                    user: {},
                    products: req.products,
                    categories: req.categories
                });
            });
        });
    });
    app.get("/laptop", function (req, res) {
        res.render("../view/laptop", {
            user: req.user
        });
    });
    app.get("/desktop", function (req, res) {
        res.render("../view/desktop", {
            user: req.user
        });
    });
    app.get("/software", function (req, res) {
        res.render("../view/software", {
            user: req.user
        });
    });
    app.get("/login", function (req, res) {
        res.render("../view/login")
    });
    app.post("/login", passport.authenticate("local", {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
    app.get("/register", function (req, res) {
        res.render("../view/register", {
            user: {}
        });
    });
    app.get("/cart", function (req, res) {
        Cart.find({user_id: req.user._id}, function (err, cartProducts) {
            res.render("../view/cart", {
                user: req.user,
                cart: cartProducts
            });
        });
    });
    app.use("/orders", function (req, res) {
        Cart.find({user_id: req.user._id}, function (err, cartProducts) {
            res.render("../view/orders", {
                user: req.user,
                cart: cartProducts
            });
        });
    })
    app.post("/register", ctcontroller.registerUser);
    app.post("/addProduct", ctcontroller.addProduct);
    app.post("/updateProduct", ctcontroller.updateProduct);
    app.post("/deleteProduct", ctcontroller.deleteProduct);
    app.post("/addCategory", ctcontroller.addCategory);
    app.get("/listCategories", ctcontroller.listCategories);
    app.post("/addItemsToCart", ctcontroller.addItemsToCart);
    app.get("/addProductPage", function (req, res) {
        res.render("../view/addProductPage", {
            user: req.user
        });
    });
}