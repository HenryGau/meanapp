/**
 * Created by HenryGau on 8/6/2014.
 */


angular.module('app').controller('mvUserListCtrl', function($scope, mvUser){
    $scope.users = mvUser.query();
});