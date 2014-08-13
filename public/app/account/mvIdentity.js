/**
 * Created by HenryGau on 8/4/2014.
 *
 * currentUser object is set in mvAuth, when user is authenticated
 */
angular.module('app').factory('mvIdentity', function($window, mvUser){
    var currentUser;
    if(!!$window.bootstrappedUserObject){
        console.log("setting mvIdentity / never set");
        currentUser = new mvUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
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