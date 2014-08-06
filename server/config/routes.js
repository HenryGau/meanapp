/**
 * Created by HenryGau on 8/4/2014.
 */


var auth = require('./auth');
module.exports = function (app) {
    app.get('/partials/*', function (req, res) {
        console.log("rendering /partials/*");
        console.log(req.params);
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function(req, res){
        req.logout();
        res.end();
    });

    app.get('*', function (req, res) {
        console.log("rendering *");
        res.render('index', {
        });
    });
};
