/**
 * Created by HenryGau on 8/13/2014.
 */


angular.module('app').factory('mvCourse', function ($resource) {
    var CourseResource = $resource('/api/courses/:_id',
        {_id: "@id"}, {
            update: {method: 'PUT', isArray: false}
        });
    return CourseResource;
});