'use strict';

angular.module('myApp.userProfile', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/userProfile', {
            templateUrl: 'userProfile/userProfile.html',
            controller: 'userProfileCtrl',
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

    .controller('userProfileCtrl', ['$scope','$rootScope','Post','UsersInfo', 'currentAuth','$firebaseAuth','Users',
        function($scope,$rootScope, Post, UsersInfo, currentAuth,  $firebaseAuth, Users) {
        $scope.dati={};
        $rootScope.dati={};
        $rootScope.dati.currentView = "userProfile";
        $scope.dati.posts = Post.getData();
        // $scope.dati.follows = UsersFollowService.getFollow();
        $scope.dati.userId = currentAuth.uid;
        $scope.dati.user = UsersInfo.getUserInfo(currentAuth.uid);

        $scope.becomeProduttore= function () {
            $scope.dati.user = Users.updateTipo(currentAuth.uid);
            var modalDiv = $("#modalProduttore");
            modalDiv.modal('hide');
            //$window.location.reload();
        };

}]);