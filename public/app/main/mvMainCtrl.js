angular.module('app').controller('mvMainCtrl', function ($scope, mvCachedCourse) {
    $scope.courses = mvCachedCourse.query();
});