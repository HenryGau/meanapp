/**
 * Created by HenryGau on 8/13/2014.
 */

angular.module('app').controller('mvCourseListCtrl', function($scope, mvCachedCourse){
    $scope.courses = mvCachedCourse.query();

    $scope.sortOptions = [{value: "title", text: "Sort by Title"},
        {value : "published", text: "Sort by Publish Date"}];
    $scope.sortOrder = $scope.sortOptions[0].value;
});