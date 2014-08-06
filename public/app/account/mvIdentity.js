/**
 * Created by HenryGau on 8/4/2014.
 */
angular.module('app').factory('mvIdentity', function(){
    return {
        currentUser: undefined,
        isAuthenticated: function(){
            return !!this.currentUser;
        }
    };
});