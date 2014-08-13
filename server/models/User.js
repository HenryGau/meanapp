/**
 * Created by HenryGau on 8/11/2014.
 */


var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type:String, required:'{PATH} is required!'},
    lastName: {type:String, required:'{PATH} is required!'},
    userName: {
        type: String,
        required: '{PATH} is required!',
        unique: true
    },
    salt: String,
    hashed_pwd: String,
    roles: [String]
});

userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole : function(role){
        return this.roles.indexOf(role) > -1;
    }
};

var User = mongoose.model('User', userSchema);


function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'joe');
            User.create({firstName: 'Joe', lastName: 'Eames',
                userName: 'joe', salt: salt, hashed_pwd: hash, roles: ['admin']});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'john');
            User.create({firstName: 'John', lastName: 'Papa',
                userName: 'john', salt: salt, hashed_pwd: hash, roles: []});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'dan');
            User.create({firstName: 'Dan', lastName: 'Buddy',
                userName: 'dan', salt: salt, hashed_pwd: hash});
        }
    });
};

exports.createDefaultUsers = createDefaultUsers;