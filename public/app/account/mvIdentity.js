/**
 * Created by HenryGau on 8/4/2014.
 */
angular.module('app').factory('mvIdentity', function($window, mvUser){
    var currentUser;
    if(!!$window.bootstrappedUserObject){
        currentUser = new mvUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
//        currentUser = $window.bootstrappedUserObject;
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function(){
            return !!this.currentUser;
        },
        isAuthorized: function(role){
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    };
});