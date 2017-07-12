'use strict';

angular.module('myApp.areaRicette', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/areaRicette', {
            templateUrl: 'areaRicette/areaRicette.html',
            controller: 'areaRicetteCtrl',
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

    .controller('areaRicetteCtrl', ['$scope', '$rootScope','$routeParams','currentAuth','Post','SinglePost',
        function($scope, $rootScope,$routeParams, currentAuth, Post, SinglePost) {

        $scope.dati={};
        $rootScope.dati={};
        $rootScope.dati.currentView="areaRicette";
        $scope.dati.userId = currentAuth.uid;
        $scope.dati.posts = Post.getData();
        //$scope.dati.ingr = Ingredienti.getData();
        $scope.orderProp = "ingredienti";
        $scope.ricetteSearch = "";
        $scope.categoriaSearch = "";
        //$scope.ricettaSearch.a = {};
        //$scope.ricettaSearch.b = {};
        $scope.difficoltaSearch = "";
        $scope.dietaSearch = "";
        $scope.ricerca = true;

        //FUNZIONI PER GESTIRE BOTTONI RICERCA
        $scope.cancellaTutto = function () {
            $scope.difficoltaSearch = "";
            $scope.dietaSearch = "";
            $scope.ricetteSearch = "";
            $scope.categoriaSearch = "";
            //$scope.ricerca = false;
        }

        $scope.setRicerca = function () {
            $scope.ricerca = true;
        }

        $scope.deleteIngrediente = function () {
            $scope.ricetteSearch = "";
        }

        $scope.deleteCategoria = function () {
                $scope.categoriaSearch = "";
        }

        $scope.deleteDieta = function () {
                $scope.dietaSearch = "";

        }
        $scope.deleteDifficolta = function () {
                $scope.difficoltaSearch = "";
        }

        }]);

