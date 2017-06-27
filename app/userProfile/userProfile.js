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

    .controller('userProfileCtrl', ['$scope','$rootScope', 'Post','UsersInfo', '$firebaseAuth', '$firebaseStorage', 'Users',
        function($scope,$rootScope, Post, UsersInfo,  $firebaseAuth, $firebaseStorage, Users) {
        $scope.dati={};
        $rootScope.dati={};
        $rootScope.dati.currentView = "userProfile";
        $scope.dati.posts = Post.getData();

        $scope.dati.userId = $firebaseAuth().$getAuth().uid;
        $scope.dati.user = UsersInfo.getUserInfo($firebaseAuth().$getAuth().uid);

        // $scope.becomeProduttore= function () {
        //     $scope.dati.user = Users.updateTipo($firebaseAuth().$getAuth().uid);
        //     $window.location.reload();
        //     var modalDiv = $("#modalProduttore");
        //     modalDiv.modal('hide');
        //     var modalMsg = $("#modalMsg");
        //     modalMsg.modal('show');
        //
        // };
        $scope.dati.nomeProduttore="";
        $scope.dati.citta="";
        $scope.dati.descrizione="";
        $scope.dati.dataNascita="";
        $scope.dati.cittaVive="";
        $scope.dati.descPersonale="";

        $scope.updateInfoProduttore = function () {
            Users.updateProduttore($scope.dati.userId, $scope.dati.nomeProduttore, $scope.dati.citta, $scope.dati.descrizione);
            $scope.dati.user = Users.updateTipo($firebaseAuth().$getAuth().uid);
            var modalDiv = $("#modalProduttore");
            modalDiv.modal('hide');
            var modalMsg = $("#modalMsg");
            modalMsg.modal('show');
        };
        $scope.close = function () {
            var modalMsg = $("#modalMsg");
            modalMsg.modal('hide');
        };

        $scope.updateInfoUser = function () {
                Users.updateInfo($scope.dati.userId, $scope.dati.dataNascita, $scope.dati.cittaVive, $scope.dati.descPersonale)
            var modalDiv = $("#modalUpdateInfo");
            modalDiv.modal('hide');
        };

        //$scope.dati.follows = UsersFollowService.getFollow();
        //$scope.dati.userId = currentAuth.uid;
        //$scope.dati.user = UsersInfo.getUserInfo(currentAuth.uid);

        var ctrl = this;
        $scope.fileToUpload = null;
        $scope.imgPath= "";

        $scope.addImage = function() {

            console.log($scope.dati.userId);

            //try to upload the image: if no image was specified, we create a new opera without an image
            if ($scope.fileToUpload != null) {
                //get the name of the file
                var fileName = $scope.fileToUpload.name;
                //specify the path in which the file should be saved on firebase
                var storageRef = firebase.storage().ref("userImages/" + fileName);
                $scope.storage = $firebaseStorage(storageRef);
                var uploadTask = $scope.storage.$put($scope.fileToUpload);
                uploadTask.$complete(function (snapshot) {
                    $scope.imgPath = snapshot.downloadURL;
                    $scope.finalAddImage();


                    });
                    uploadTask.$error(function (error) {
                        $scope.dati.error = error + " - l'utente rimmarrà senza immagine profilo :(";
                        //senza aggiungere un immagine
                        $scope.finalAddImage();
                    });
                }
                else {
                    //do not add the image
                    $scope.finalAddImage();

                }
            var modalDiv = $("#modalAddImmagine");
            modalDiv.modal('hide');
            };

            //initialize the function that will be called when a new file will be specified by the user
            ctrl.onChange = function onChange(fileList) {
                $scope.fileToUpload = fileList[0];
                console.log($scope.fileToUpload.name);
            };

            $scope.finalAddImage = function() {
                Users.updateImage($scope.dati.userId, $scope.imgPath);
                console.log("greeeeen");
                $scope.dati.feedback = "Inserimento effettuato con successo";

                // var modalDiv = $("#modalAddImmagine");
                // modalDiv.modal('hide');

            };

}]);