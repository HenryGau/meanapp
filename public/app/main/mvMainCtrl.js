angular.module('app').controller('mvMainCtrl', function($scope){
    $scope.courses = [
        {name: 'C++ for dummies', featured: true, publised:new Date()},
        {name: 'Java for retards', featured: false, publised:new Date()}
    ]


})