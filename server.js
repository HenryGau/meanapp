var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path){
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));
app.use(express.static(__dirname + '/public'));//favicon.ico

if(env === 'development'){
    mongoose.connect('mongodb://localhost/multivision');
} else {
    mongoose.connect('mongodb://henry:ninhbinh@ds053419.mongolab.com:53419/multivision_henry');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error...'));
db.once('open', function callback(){
    console.log('multivision db opened');
});

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc){
    mongoMessage = messageDoc.message;
    console.log("found Messge:" + mongoMessage);
});


app.get('/partials/:partialPath', function(req, res){
    console.log("rendering /partials/:partialPath");
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res){
    console.log("rendering *");
    res.render('index', {
        mongoMessage: mongoMessage
    });
});

var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + "...");