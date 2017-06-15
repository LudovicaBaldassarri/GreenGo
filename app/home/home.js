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
            //salva la data di oggi e la inserisce come attributo nel firebase del post
            $scope.dati.date = new Date();
            //scompone la data completa in gg/mm/aaa da stampare in html quando serve
            var month = $scope.dati.date.getUTCMonth()+1;
            $scope.dati.dataStampa = $scope.dati.date.getUTCDate() + "/"+ month + "/" + $scope.dati.date.getUTCFullYear();
            //scompone l0ora da date in hh:mm:ss da stampare quando serve
            $scope.dati.oraStampa= $scope.dati.date.getUTCHours()+ ":"+$scope.dati.date.getUTCMinutes()+":"+$scope.dati.date.getUTCSeconds();


            console.log($scope.dati.dataStampa);
            console.log($scope.dati.oraStampa);

            $scope.addPost= function() {
                InsertPostService.insertNewPost($scope.dati.userId, $scope.dati.user.name, $scope.dati.user.surname, $scope.dati.descrizione, $scope.dati.date, $scope.dati.dataStampa, $scope.dati.oraStampa).then(function(ref) {
                    var postId = ref.key;
                    $scope.dati.userInfo = InsertPostService.getUserInfo($scope.dati.userId);
                    InsertPostService.updatePost(postId);
                    $scope.dati.descrizione = "";
                    console.log("hai aggiunto un post");
                });
            } ;

        }]);
