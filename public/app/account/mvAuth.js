/**
 * Created by HenryGau on 8/5/2014.
 */
angular.module('app').factory('mvAuth', function ($http, mvIdentity, $q, mvUser) {
    return {
        authenticateUser: function (username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password})
                .then(function (response) {
                    if (response.data.success) {
                        var user = new mvUser();
                        angular.extend(user, response.data.user);
                        // Set to mvIdentity to hold user's object
                        mvIdentity.currentUser = user;
                        dfd.resolve(true);
                    } else {
                        dfd.resolve(false);
                    }
                });
            return dfd.promise;
        },

        createUser: function (newUserData) {
            var newUser = new mvUser(newUserData);
            var dfd = $q.defer();

            newUser.$save().then(function () {
                mvIdentity.currentUser = newUser;
                dfd.resolve();
            }, function (response) {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },

        updateCurrentUser: function (newUserData) {
            var dfd = $q.defer();
            console.log(newUserData);
            console.log(getAll(newUserData));

            var clone = angular.copy(mvIdentity.currentUser);
            angular.extend(clone, newUserData);

            //Send the PUT to mvUser resource
            clone.$update().then(function(response){
                console.log("PUT response:");
                console.log(response);
                mvIdentity.currentUser = clone;
                dfd.resolve();
            }, function(response) {
                console.log("PUT response:");
                console.log(response);
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },


        logoutUser: function () {
            var dfd = $q.defer();
            $http.post('/logout', {logout: true}).then(function () {
                mvIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },
        authorizeCurrentUserForRoute: function (role) {
            if (mvIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },
        authorizeAuthenticatedUserForRoute: function () {
            if (mvIdentity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not autorized');
            }
        }
    }
});

function getAll(object){
    return Object.getOwnPropertyNames(object).filter(function(property) {
        return typeof object[property] == 'function';
    });
}

