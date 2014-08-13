/**
 * Created by HenryGau on 8/14/2014.
 */


angular.module('app').controller('mvCourseDetailCtrl', function ($scope, mvCachedCourse, $routeParams) {
    mvCachedCourse.query().$promise.then(function (collection) {
        collection.forEach(function (course) {
            if (course._id === $routeParams.id) {
                $scope.course = course;
            }
        })
    });
});