'user strict';

angular.module('myApp.detailsRicetta', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/detailsRicetta/:postId', {
        templateUrl: 'detailsRicetta/detailsRicetta.html',
        controller: 'detailsRicettaCtrl',
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

.controller('detailsRicettaCtrl', ['$scope', '$rootScope', 'SinglePost', '$routeParams', 'currentAuth',
    function ($scope, $rootScope, SinglePost, $routeParams, currentAuth) {
        $scope.dati = {};
        $rootScope.dati= {};
        $rootScope.dati.currentView = "detailsRicetta";
        $scope.dati.post = SinglePost.getSinglePost($routeParams.postId);
        $scope.dati.userId = currentAuth.uid;

    }
]);
