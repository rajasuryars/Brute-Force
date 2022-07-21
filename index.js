const express = require('express'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv'),
    mongoose = require('mongoose'),
    Routes = require('./routes/ctroute'),
    cors = require('cors')

dotenv.config();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database!")
});

var app = express();
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "expsessionsecret",
    resave: false,
    saveUninitialized: false
}));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
Routes(app, passport)
require('./config/passport')(passport);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`)
})
