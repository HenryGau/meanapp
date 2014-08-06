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

require('./server/config/passport')();


//var messageSchema = mongoose.Schema({message: String});
//var Message = mongoose.model('Message', messageSchema);
//var mongoMessage;
//Message.findOne().exec(function(err, messageDoc){
//    mongoMessage = messageDoc.message;
//    console.log("found Messge:" + mongoMessage);
//});

app.listen(config.port);
console.log('Listening on port ' + config.port + "...");