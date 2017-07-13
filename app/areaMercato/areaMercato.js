'use strict';

angular.module('myApp.areaMercato', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/areaMercato', {
            templateUrl: 'areaMercato/areaMercato.html',
            controller: 'areaMercatoCtrl',
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

    .controller('areaMercatoCtrl', ['$scope', '$rootScope', '$routeParams', 'currentAuth', 'Prodotto',
        function($scope, $rootScope, $routeParams, currentAuth, Prodotto) {

            $scope.dati={};
            $rootScope.dati={};
            $rootScope.dati.currentView="areaMercato";
            $scope.dati.userId = currentAuth.uid;
            $scope.dati.products = Prodotto.getData();

            $scope.prodottiSearch = "";
            $scope.categoriaSearch = "";
            $scope.cittaSearch = "";

            $scope.ricerca = false;

            //FUNZIONI PER GESTIRE BOTTONI RICERCA
            $scope.cancellaTutto = function () {
                $scope.prodottiSearch = "";
                $scope.categoriaSearch = "";
                $scope.cittaSearch = "";
                $scope.ricerca = false;
            }

            $scope.setRicerca = function () {
                $scope.ricerca = true;
            }

            $scope.deleteIngrediente = function () {
                $scope.prodottiSearch = "";
            }

            $scope.deleteCategoria = function () {
                $scope.categoriaSearch = "";
            }

            $scope.deleteCitta = function () {
                $scope.cittaSearch = "";
            }



        }]);