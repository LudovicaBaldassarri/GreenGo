'use strict';

angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'homeCtrl',
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

    .controller('homeCtrl',['$scope','$rootScope','currentAuth', 'Post', 'InsertPostService',
        function($scope, $rootScope, currentAuth, Post, InsertPostService) {
            // Post.getData().$loaded.then(function(data) {
            //     $scope.dati={};
            //     $rootScope.dati={};
            //     $scope.dati.vm = this;
            //     $rootScope.dati.currentView = "home";
            //     $scope.dati.posts = Post.getData();
            // });
            $scope.dati={};
            $scope.dati.feedback = "" ;
            $rootScope.dati={};
            $rootScope.dati.currentView = "home";
            $scope.dati.userId = currentAuth.uid;

            $scope.dati.posts = Post.getData();

            $scope.addPost= function() {
                InsertPostService.insertNewPost($scope.dati.userId, $scope.dati.descrizione).then(function(ref) {
                    var postId = ref.key;
                    $scope.dati.userInfo = InsertPostService.getUserInfo($scope.dati.userId);
                    InsertPostService.updatePost(postId);
                    $scope.dati.descrizione = "";
                    $scope.dati.feedback="grandioso! ha aggiunto un post";
                });
            } ;



            // $scope.fileToUpload = null;
            // $scope.imgPath = "";
            //
            // var ctrl = this;
            //
            //     $scope.addPost = function () {
            //     if ($scope.dati.descrizione != undefined && $scope.dati.descrizione != "") {
            //         $scope.dati.error = "";
            //
            //         // prova a caricare l'immagine: se nessun immagine è specificata, crea un nuovo post senza immagine
            //         if ($scope.fileToUpload != null) {
            //             var fileName = $scope.fileToUpload.name;
            //             var storageRef = firebase.storage().ref("images/" + fileName);
            //             $scope.storage = $firebaseStorage(storageRef);
            //             var uploadTask = $scope.storage.$put($scope.fileToUpload);
            //             uploadTask.$complete(function(snapshot){
            //                 $scope.finalPostAddition();
            //             });
            //         uploadTask.$error(function(error){
            //             $scope.finalPostAddition();
            //         });
            //         }
            //         else {
            //             $scope.finalPostAddition() ;
            //         }
            //     }
            //     else {
            //         // da modificare! impediamo di pubblicare un post vuoto
            //         $scope.dati.error= "stai creando un post vuoto :(";
            //     }
            // };
            //
            // ctrl.onChange = function onChange(fileList) {
            //      $scope.fileToUpload = fileList[0];
            //  };



        }]);
