/**
 * Created by HenryGau on 8/14/2014.
 */


angular.module('app').controller('mvCourseDetailCtrl', function($scope, mvCourse, $routeParams){
    $scope.course = mvCourse.get({_id: $routeParams.id})
});