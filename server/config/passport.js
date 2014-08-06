/**
 * Created by HenryGau on 8/6/2014.
 */

var passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User');

module.exports = function(){
    passport.use(new LocalStrategy(
        function (username, password, done) {
            console.log("Try to login:" + username + "|" + password);
            User.findOne({userName: username}).exec(function (err, user) {
                if (user && user.authenticate(password)) {
                    console.log("found Users");
                    return done(null, user);
                } else {
                    console.log("Cannot found Users");
                    return done(null, false);
                }
            })
        }
    ));

    passport.serializeUser(function (user, done) {
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({_id: id}).exec(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    });
};
