/**
 * Created by HenryGau on 8/4/2014.
 */

angular.module('app').controller('mvNavBarLoginCtrl', function ($scope, $http, $location,
                                                                mvIdentity, mvNotifier, mvAuth) {
    $scope.identity = mvIdentity;
    $scope.signIn = function (username, password) {
        mvAuth.authenticateUser(username, password).then(function(success){
            if(success){
                mvNotifier.notify("You have signed in!");
            } else {
                mvNotifier.notify("Username/Password combination incorrect");
            }
        })
    }

    $scope.signOut = function(){
        mvAuth.logoutUser().then(function(){
            $scope.username = "";
            $scope.password = "";

            mvNotifier.notify('You have successfully signed out!');
            $location.path('/');
        })
    }
});
