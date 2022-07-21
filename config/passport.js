const localStrategy = require('passport-local').Strategy;
const User = require('../model/user');
const userInstance = new User();

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        User.findOne({email: email}, function(err, user) {
            if (err) return done(err);
            if (!user)
                return done(null, false);
            if (!userInstance.isPasswordValid(password, user.password, user.salt)) {
                return done(null, false);
            }
            return done(err, user);
        });
    }));
}