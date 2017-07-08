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

.controller('detailsRicettaCtrl', ['$scope', '$rootScope', 'SinglePost', '$routeParams', 'currentAuth','InsertPostService',
    function ($scope, $rootScope, SinglePost, $routeParams, currentAuth, InsertPostService) {
        $scope.dati = {};
        $rootScope.dati= {};
        $rootScope.dati.currentView = "detailsRicetta";
        $scope.dati.post = SinglePost.getSinglePost($routeParams.postId);
        $scope.dati.userId = currentAuth.uid;
        // $scope.dati.post.sumVoti="";

        $scope.addVoto= function () {

           InsertPostService.updateVoto($routeParams.postId, $scope.dati.post.voto);
           InsertPostService.updateVotatori($routeParams.postId, $scope.dati.post.votatori);
           // InsertPostService.updateSumVoti($routeParams.postId, $scope.dati.post.sumVoti, $scope.dati.post.voto);
           // $scope.dati.post.sumVoti="";

        };
    }
]);
