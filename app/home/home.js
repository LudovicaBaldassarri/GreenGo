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

    .controller('homeCtrl',['$scope','$rootScope','currentAuth','UsersInfo', 'Post', 'InsertPostService',
        function($scope, $rootScope, currentAuth, UsersInfo, Post, InsertPostService) {
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
            $scope.dati.user = UsersInfo.getUserInfo(currentAuth.uid);
            $scope.dati.posts = Post.getData();
            console.log($scope.dati.user);

            $scope.addPost= function() {
                InsertPostService.insertNewPost($scope.dati.userId,$scope.dati.user.name, $scope.dati.descrizione).then(function(ref) {
                    var postId = ref.key;
                    $scope.dati.userInfo = InsertPostService.getUserInfo($scope.dati.userId);
                    InsertPostService.updatePost(postId);
                    $scope.dati.descrizione = "";
                    console.log("hai aggiunto un post");
                    // SERVE PER CHIUDERE IL MODAL
                    var modalDiv = $("#modalPost");
                    modalDiv.modal('hide');
                    var modalDiv = $("#modalRicetta");
                    modalDiv.modal('hide');
                });
            } ;

        }]);
