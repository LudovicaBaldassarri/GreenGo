'use strict';

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

.controller('detailsRicettaCtrl', ['$scope', '$rootScope', 'SinglePost', '$routeParams', 'currentAuth', 'UsersInfo','InsertPostService', 'InsertCommentoService',
    function ($scope, $rootScope, SinglePost, $routeParams, currentAuth, UsersInfo, InsertPostService, InsertCommentoService) {
        $scope.dati = {};
        $rootScope.dati = {};
        $rootScope.dati.currentView = "detailsRicetta";
        $scope.dati.post = SinglePost.getSinglePost($routeParams.postId);
        $scope.dati.userId = currentAuth.uid;
        $scope.dati.user = UsersInfo.getUserInfo(currentAuth.uid);
        $scope.dati.commenti = InsertCommentoService.getCommenti($routeParams.postId);
        $scope.dati.savers = InsertPostService.getSavers($routeParams.postId);

        $scope.dati.commento = "";

        //salva la data di oggi e la inserisce come attributo nel firebase del post
        $scope.dati.date = new Date();
        //scompone la data completa in gg/mm/aaa da stampare in html quando serve
        var month = $scope.dati.date.getUTCMonth() + 1;
        $scope.dati.dataStampa = $scope.dati.date.getUTCDate() + "/" + month + "/" + $scope.dati.date.getUTCFullYear();
        //scompone l0ora da date in hh:mm:ss da stampare quando serve
        $scope.dati.oraStampa = $scope.dati.date.getUTCHours() + ":" + $scope.dati.date.getUTCMinutes() + ":" + $scope.dati.date.getUTCSeconds();


        /*$scope.dati.post.$loaded().then(function () {
            $scope.dati.oraStampa = $scope.dati.post.oraStampa;
            $scope.dati.dataStampa = $scope.dati.post.dataStampa;

        })*/

        console.log($scope.dati.user);
        console.log($scope.dati.dataStampa);
        //ALGORITMO PER I VOTI STELLE

        $scope.valueUno = function () {
            $scope.dati.post.nuovoVoto = 1;
        },
            $scope.valueDue = function () {
                $scope.dati.post.nuovoVoto = 2;
            },
            $scope.valueTre = function () {
                $scope.dati.post.nuovoVoto = 3;
            },
            $scope.valueQuattro = function () {
                $scope.dati.post.nuovoVoto = 4;
            },
            $scope.valueCinque = function () {
                $scope.dati.post.nuovoVoto = 5;
            },
            $scope.addVoto = function () {
                if ($scope.dati.post.votatori == null) {
                    InsertPostService.setVotatori($routeParams.postId);
                } else {
                    InsertPostService.updateVotatori($routeParams.postId, $scope.dati.post.votatori);
                }
                if ($scope.dati.post.voto == null) {
                    InsertPostService.setVoto($routeParams.postId, $scope.dati.post.nuovoVoto);
                    $scope.dati.post.media = $scope.dati.post.nuovoVoto;
                    InsertPostService.updateMedia($routeParams.postId, $scope.dati.post.media);
                } else {
                    InsertPostService.updateVoto($routeParams.postId, $scope.dati.post.voto, $scope.dati.post.nuovoVoto);
                    $scope.dati.post.media = parseInt(parseInt($scope.dati.post.voto) / parseInt($scope.dati.post.votatori));
                    InsertPostService.updateMedia($routeParams.postId, $scope.dati.post.media);
                }
                var form = $("#formVota");
                form.hide();
                var voto = $("#miovoto");
                voto.show();
            },

        $scope.salvaRicetta = function () {
            InsertPostService.savePost($routeParams.postId, currentAuth.uid);
            var bottone = $("#btnSalva");
            bottone.hide();

        },

        $scope.addCommento = function () {

            //check if the user inserted all the required information
            if ($scope.dati.commento != undefined && $scope.dati.commento != "") {
                $scope.dati.error = "";
                $scope.dati.post.$loaded().then(function () {
                    /*$scope.dati.oraStampa = $scope.dati.post.oraStampa;
                    $scope.dati.dataStampa = $scope.dati.post.dataStampa;
                    console.log($scope.dati.oraStampa);
                    console.log($scope.dati.dataStampa);*/
                })
                $scope.finalCommentoAddition();

            }
            else {
                //write an error message to the user
                $scope.dati.error = "You forgot to insert one of the required information!";
            }
        },


        console.log($scope.dati.post.$id);
        console.log($scope.dati.post.oraStampa);
        console.log($scope.dati.userId);
        console.log($scope.dati.user.name);

        $scope.finalCommentoAddition = function () {
            InsertCommentoService.insertNewCommento($scope.dati.post.$id, $scope.dati.userId, $scope.dati.user.name, $scope.dati.user.surname, $scope.dati.user.img_url,
                $scope.dati.commento, $scope.dati.dataStampa, $scope.dati.oraStampa);

            $scope.dati.commento = "";
        };


    }
]);
