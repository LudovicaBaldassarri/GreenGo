'use strict';

angular.module('myApp.paginaProduttore', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/paginaProduttore', {
            templateUrl: 'paginaProduttore/paginaProduttore.html',
            controller: 'paginaProduttoreCtrl',
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

    .controller('paginaProduttoreCtrl', [ '$scope', '$rootScope', 'Prodotto', 'InsertProdottoService', 'UsersInfo', '$firebaseAuth', '$firebaseStorage', 'Users',
        function($scope, $rootScope, Prodotto, InsertProdottoService, UsersInfo, $firebaseAuth, $firebaseStorage, Users) {
            $scope.dati={};
            $rootScope.dati={};
            $rootScope.dati.currentView = "paginaProduttore";
            $scope.dati.products = Prodotto.getData();
            $scope.dati.userId = $firebaseAuth().$getAuth().uid;
            $scope.dati.user = UsersInfo.getUserInfo($firebaseAuth().$getAuth().uid);

            console.log($scope.dati.user);

            //per inserimento prodotto

            $scope.dati.date = new Date();
            //scompone la data completa in gg/mm/aaa da stampare in html quando serve
            var month = $scope.dati.date.getUTCMonth() + 1;
            $scope.dati.dataStampa = $scope.dati.date.getUTCDate() + "/" + month + "/" + $scope.dati.date.getUTCFullYear();
            //scompone l0ora da date in hh:mm:ss da stampare quando serve
            $scope.dati.oraStampa = $scope.dati.date.getUTCHours() + ":" + $scope.dati.date.getUTCMinutes() + ":" + $scope.dati.date.getUTCSeconds();

            $scope.dati.nomeProdotto = "";
            $scope.dati.descrizione = "";
            $scope.dati.prezzo = "";
            $scope.dati.categoria= "";

            var ctrl = this;
            $scope.fileToUpload = null;
            $scope.imgPath = "";

            $scope.addProdotto = function () {

                //check if the user inserted all the required information
                if ($scope.dati.descrizione != undefined && $scope.dati.descrizione != "") {
                    $scope.dati.error = "";
                    //try to upload the image: if no image was specified, we create a new opera without an image
                    if ($scope.fileToUpload != null) {
                        //get the name of the file
                        var fileName = $scope.fileToUpload.name;
                        //specify the path in which the file should be saved on firebase
                        var storageRef = firebase.storage().ref("images/" + fileName);
                        $scope.storage = $firebaseStorage(storageRef);
                        var uploadTask = $scope.storage.$put($scope.fileToUpload);
                        uploadTask.$complete(function (snapshot) {
                            $scope.imgPath = snapshot.downloadURL;
                            $scope.finalProdottoAddition();

                        });
                        uploadTask.$error(function (error) {
                            $scope.dati.error = error + " - the Post will be added without a descriptive image!";
                            $scope.finalProdottoddition();
                        });
                    }
                    else {
                        //do not add the image
                        $scope.finalProdottoAddition();

                    }
                }
                else {
                    //write an error message to the user
                    $scope.dati.error = "You forgot to insert one of the required information!";
                }
            };
            //initialize the function that will be called when a new file will be specified by the user
            ctrl.onChange = function onChange(fileList) {
                $scope.fileToUpload = fileList[0];
            };


            $scope.finalProdottoAddition = function () {
                InsertProdottoService.insertNewProdotto($scope.dati.userId, $scope.dati.user.nomeProduttore, $scope.dati.user.img_url,
                           $scope.dati.descrizione, $scope.dati.prezzo, $scope.dati.date, $scope.dati.dataStampa,
                           $scope.dati.oraStampa, $scope.dati.nomeProdotto, $scope.dati.categoria, $scope.imgPath).then(function (ref) {

                    var prodottoId = ref.key;
                    $scope.dati.userInfo = InsertProdottoService.getUserInfo($scope.dati.userId);
                    InsertProdottoService.updateProdotto(prodottoId);
                    $scope.dati.descrizione = "";
                    $scope.dati.prezzo = "";
                    $scope.dati.categoria= "";
                    $scope.dati.nomeProdotto = "";

                    // SERVE PER CHIUDERE IL MODAL
                    var modalDiv = $("#modalProdotto");
                    modalDiv.modal('hide');


                });

            };



        }]);
