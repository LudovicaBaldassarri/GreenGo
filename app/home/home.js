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


    .controller('homeCtrl',['$scope','$rootScope', '$firebaseAuth','UsersInfo', 'Post', 'InsertPostService', '$firebaseStorage',
        function($scope, $rootScope, $firebaseAuth , UsersInfo, Post, InsertPostService, $firebaseStorage) {

            $scope.dati = {};
            $scope.dati.feedback = "";
            $rootScope.dati = {};
            $rootScope.dati.currentView = "home";

            $scope.dati.userId = $firebaseAuth().$getAuth().uid;
            $scope.dati.user = UsersInfo.getUserInfo($firebaseAuth().$getAuth().uid);

            $scope.dati.posts = Post.getData();


            //salva la data di oggi e la inserisce come attributo nel firebase del post
            $scope.dati.date = new Date();
            //scompone la data completa in gg/mm/aaa da stampare in html quando serve
            var month = $scope.dati.date.getUTCMonth() + 1;
            $scope.dati.dataStampa = $scope.dati.date.getUTCDate() + "/" + month + "/" + $scope.dati.date.getUTCFullYear();
            //scompone l0ora da date in hh:mm:ss da stampare quando serve
            $scope.dati.oraStampa = $scope.dati.date.getUTCHours() + ":" + $scope.dati.date.getUTCMinutes() + ":" + $scope.dati.date.getUTCSeconds();


            $scope.dati.titolo = "";
            $scope.dati.procedimento = "";
            $scope.dati.difficolta = "";
            $scope.dati.tempoP = "";
            $scope.dati.tempoC = "";
            $rootScope.dati.tag = "";
            $scope.dati.ingrediente1 = "";
            $scope.dati.ingrediente2 = "";
            $scope.dati.ingrediente3 = "";
            $scope.dati.ingrediente4 = "";
            $scope.dati.ingrediente5 = "";
            $scope.dati.ingrediente6 = "";
            $scope.dati.ingrediente7 = "";
            $scope.dati.ingrediente8 = "";
            $scope.dati.ingrediente9 = "";
            $scope.dati.ingrediente10 = "";

            var ctrl = this;
            $scope.fileToUpload = null;
            $scope.imgPath = "";


            $scope.addPost = function () {

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
                            $scope.finalPostAddition();
                            console.log("inserisco immagine");

                        });
                        uploadTask.$error(function (error) {
                            $scope.dati.error = error + " - the Post will be added without a descriptive image!";
                            $scope.finalPostAddition();
                        });
                    }
                    else {
                        //do not add the image
                        $scope.finalPostAddition();

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


            $scope.finalPostAddition = function () {
                InsertPostService.insertNewPost($scope.dati.userId, $scope.dati.user.name, $scope.dati.user.surname, $scope.dati.user.img_url,
                    $scope.dati.descrizione, $scope.dati.date, $scope.dati.dataStampa,
                    $scope.dati.oraStampa, $scope.dati.titolo, $scope.dati.procedimento,
                    $scope.dati.difficolta, $scope.dati.tempoP, $scope.dati.tempoC, $rootScope.dati.tag, $scope.imgPath,
                    $scope.dati.ingrediente1, $scope.dati.ingrediente2, $scope.dati.ingrediente3,
                    $scope.dati.ingrediente4, $scope.dati.ingrediente5, $scope.dati.ingrediente6,
                    $scope.dati.ingrediente7, $scope.dati.ingrediente8,
                    $scope.dati.ingrediente9, $scope.dati.ingrediente10).then(function (ref) {

                    var postId = ref.key;
                    $scope.dati.userInfo = InsertPostService.getUserInfo($scope.dati.userId);
                    InsertPostService.updatePost(postId);
                    $scope.dati.descrizione = "";
                    $scope.dati.titolo = "";
                    $scope.dati.procedimento = "";
                    $scope.dati.difficolta = "";
                    $rootScope.dati.tempoP = "";
                    $scope.dati.tempoC = "";
                    $scope.dati.tag = "";
                    $scope.dati.ingrediente1 = "";
                    $scope.dati.ingrediente2 = "";
                    $scope.dati.ingrediente3 = "";
                    $scope.dati.ingrediente4 = "";
                    $scope.dati.ingrediente5 = "";
                    $scope.dati.ingrediente6 = "";
                    $scope.dati.ingrediente7 = "";
                    $scope.dati.ingrediente8 = "";
                    $scope.dati.ingrediente9 = "";
                    $scope.dati.ingrediente10 = "";

                    console.log($rootScope.dati.tag);
                    console.log("hai aggiunto un post");

                    // SERVE PER CHIUDERE IL MODAL
                    var modalDiv = $("#modalPost");
                    modalDiv.modal('hide');
                    var modalDiv = $("#modalRicetta");
                    modalDiv.modal('hide');
                    var modalDiv = $("#modalTutorial");
                    modalDiv.modal('hide');


                });

            };


            $scope.removePost = function(postId){
                Post.deletePost(postId);}

            // funzioni per l'aggiunta di input INGREDIENTI
            $scope.addIng2 = function () {
                document.getElementById("ing2").style.display = "block";
            };
            $scope.addIng3 = function () {
                document.getElementById("ing3").style.display = "block";
            };
            $scope.addIng4 = function () {
                document.getElementById("ing4").style.display = "block";
            };
            $scope.addIng5 = function () {
                document.getElementById("ing5").style.display = "block";
            };
            $scope.addIng6 = function () {
                document.getElementById("ing6").style.display = "block";
            };
            $scope.addIng7 = function () {
                document.getElementById("ing7").style.display = "block";
            };
            $scope.addIng8 = function () {
                document.getElementById("ing8").style.display = "block";
            };
            $scope.addIng9 = function () {
                document.getElementById("ing9").style.display = "block";
            };
            $scope.addIng10 = function () {
                document.getElementById("ing10").style.display = "block";
            };

            // function conto() {
            //     var x = document.getElementById("ingrd").lenght;
            //     console.log(x);
            // }


            // TAG RICETTA-TUTORIAL
            $scope.setTag = function (nometag) {
                $rootScope.dati.tag = nometag;
                // CHIUDE IL MODAL POST PICCOLO
                //var modalDiv = $("#modalPost");
               // modalDiv.modal('hide');
                console.log($rootScope.dati.tag);
            };
    }]);

//  LISTA DINAMICA PER L'INSERIMENTO DEGLI INGREDIENTI
// $(document).on('click', '.btn-add', function (e) {
//     e.preventDefault();
//
//     var controlForm = $('.controls span:first'),
//         currentEntry = $(this).parents('.entry').filter(":first"),
//         newEntry = currentEntry.clone().appendTo(controlForm);
//
//     newEntry.find('input').val('');
//     controlForm.find('.entry:not(:last) .btn-add')
//         .removeClass('btn-add').addClass('btn-remove')
//         .removeClass('btn-success').addClass('btn-danger')
//         .html('<span class="glyphicon glyphicon-minus"></span>');
// });
//
// $(document).on('click', '.btn-remove', function (e) {
//     $(this).parents('.entry:first').remove();
//
//     e.preventDefault();
//     return false;
// });
// FINE LISTA DINAMICA


