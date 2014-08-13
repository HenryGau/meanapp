/**
 * Created by HenryGau on 8/13/2014.
 */

var Course = require('mongoose').model('Course');

exports.getCourses = function(req, res) {
    Course.find({}).exec(function(err, collection){
        res.send(collection);
    })
};

exports.getCourseById = function(req, res) {
    Course.findOne({_id:req.params.id }).exec(function(err, course){
        res.send(course);
    })
}