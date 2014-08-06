var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/routes')(app);

var User = mongoose.model('User');
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


//var messageSchema = mongoose.Schema({message: String});
//var Message = mongoose.model('Message', messageSchema);
//var mongoMessage;
//Message.findOne().exec(function(err, messageDoc){
//    mongoMessage = messageDoc.message;
//    console.log("found Messge:" + mongoMessage);
//});

app.listen(config.port);
console.log('Listening on port ' + config.port + "...");