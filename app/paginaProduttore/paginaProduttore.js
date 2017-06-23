'use strict';

angular.module('myApp.paginaProduttore', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/paginaProduttore', {
            templateUrl: 'paginaProduttore/paginaProduttore.html',
            controller: 'paginaProduttoreCtrl',
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                    // $requireSignIn returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $routeChangeError (see above)
                    return Auth.$requireSignIn();
                }]

            }
        });
    }])

    .controller('paginaProduttoreCtrl', [ function() {

        }]);
