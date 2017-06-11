'user strict';

angular.module('myApp.detailsRicetta', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/detailsRicetta/:ricettaId', {
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
    })
}])

.controller('detailsRicettaCtrl', ['$scope', '$rootScope', 'SingleRicetta', '$routeParams',
    function ($scope, $rootScope, SingleRicetta, $routeParams) {
        $scope.dati = {};
        $rootScope.dati= {};
        $rootScope.dati.currentView = "detailsRicetta";
        $scope.dati.ricetta = SingleRicetta.getSingleRicetta($routeParams.ricettaId);
    }
]);
