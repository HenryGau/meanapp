/**
 * Created by HenryGau on 8/4/2014.
 */
var mongoose = require('mongoose'),
    userModel = require('../models/User');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'DB connection error...'));
    db.once('open', function callback() {
        console.log('multivision db opened');
    });

    userModel.createDefaultUsers();
};
