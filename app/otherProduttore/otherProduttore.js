'use strict';

angular.module('myApp.otherProduttore', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/otherProduttore/:otherProduttoreId', {
            templateUrl: 'otherProduttore/otherProduttore.html',
            controller: 'otherProduttoreCtrl',
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
    .controller('otherProduttoreCtrl', ['$scope', '$rootScope', '$routeParams','currentAuth', 'UsersFollowService', 'UsersInfo',
        'Prodotto','SendMessaggioService', function ($scope, $rootScope, $routeParams, currentAuth,  UsersFollowService, UsersInfo, Prodotto, SendMessaggioService) {
            $scope.dati = {};
            $rootScope.dati= {};
            $rootScope.dati.currentView = "otherProduttore";

            $scope.dati.userId = UsersFollowService.getUserInfo(currentAuth.uid);
            $scope.dati.user = UsersInfo.getUserInfo(currentAuth.uid);
            $scope.dati.otherProduttoreId = $routeParams.otherProduttoreId;
            $scope.dati.otherProduttoreInfo = UsersFollowService.getUserInfo($scope.dati.otherProduttoreId);
            $scope.dati.products = Prodotto.getData();

            //salva la data di oggi e la inserisce come attributo nel firebase del post
            $scope.dati.date = new Date();
            //scompone la data completa in gg/mm/aaa da stampare in html quando serve
            var month = $scope.dati.date.getUTCMonth() + 1;
            $scope.dati.dataStampa = $scope.dati.date.getUTCDate() + "/" + month + "/" + $scope.dati.date.getUTCFullYear();
            //scompone l0ora da date in hh:mm:ss da stampare quando serve
            $scope.dati.oraStampa = $scope.dati.date.getUTCHours() + ":" + $scope.dati.date.getUTCMinutes() + ":" + $scope.dati.date.getUTCSeconds();

            console.log($scope.dati.user.name);

            $scope.addMessage = function () {
                //check if the user inserted all the required information
                if ($scope.dati.testo != undefined && $scope.dati.testo != "") {
                    $scope.dati.error = "";
                    /*$scope.dati.user.$loaded().then(function () {
                        $scope.dati.name = $scope.dati.user.name;
                        $scope.dati.surname = $scope.dati.user.surname;
                        $scope.dati.img_url = $scope.dati.user.img_url;
                        console.log($scope.dati.name);
                        console.log($scope.dati.surname);
                    })*/
                    $scope.finalMessaggioAddition();

                }
                else {
                    //write an error message to the user
                    $scope.dati.error = "You forgot to insert one of the required information!";
                }
            };

            $scope.finalMessaggioAddition = function () {
                SendMessaggioService.sendNewMessage($scope.dati.userId.$id, $scope.dati.otherProduttoreId, $scope.dati.user.name, $scope.dati.user.surname, $scope.dati.user.img_url,
                    $scope.dati.date, $scope.dati.oraStampa, $scope.dati.dataStampa ,$scope.dati.testo).then(function (ref) {

                    var messaggioId = ref.key;
                    //$scope.dati.userInfo = SendMessaggioService.getUserInfo($scope.dati.userId);
                    SendMessaggioService.updateMessaggio(messaggioId);
                    $scope.dati.testo = "";

                    console.log("hai aggiunto un post");

                    // SERVE PER CHIUDERE IL MODAL
                    var modalDiv = $("#modalMessaggio");
                    modalDiv.modal('hide');

                });

            };
        }
    ]);
