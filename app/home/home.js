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


    .controller('homeCtrl',['$scope','$rootScope', 'currentAuth','UsersInfo', 'Post', 'InsertPostService',
        function($scope, $rootScope, currentAuth , UsersInfo, Post, InsertPostService) {

            $scope.dati={};
            $scope.dati.feedback = "" ;
            $rootScope.dati={};
            $rootScope.dati.currentView = "home";

            $scope.dati.userId = currentAuth.uid;
            $scope.dati.user = UsersInfo.getUserInfo(currentAuth.uid);
            //$scope.dati.userId = $firebaseAuth.getAuth().uid;

            $scope.dati.posts = Post.getData();


            //salva la data di oggi e la inserisce come attributo nel firebase del post
            $scope.dati.date = new Date();
            //scompone la data completa in gg/mm/aaa da stampare in html quando serve
            var month = $scope.dati.date.getUTCMonth()+1;
            $scope.dati.dataStampa = $scope.dati.date.getUTCDate() + "/"+ month + "/" + $scope.dati.date.getUTCFullYear();
            //scompone l0ora da date in hh:mm:ss da stampare quando serve
            $scope.dati.oraStampa= $scope.dati.date.getUTCHours()+ ":"+$scope.dati.date.getUTCMinutes()+":"+$scope.dati.date.getUTCSeconds();

            $scope.dati.titolo = "";
            $scope.dati.procedimento ="";
            $scope.dati.difficolta ="";
            $scope.dati.tempo ="";
            $scope.dati.tag ="";
            $scope.dati.ingrediente ="";


            $scope.addPost= function() {
                InsertPostService.insertNewPost($scope.dati.userId, $scope.dati.user.name, $scope.dati.user.surname,
                                                $scope.dati.descrizione, $scope.dati.date, $scope.dati.dataStampa,
                                                $scope.dati.oraStampa, $scope.dati.titolo, $scope.dati.procedimento,
                                                $scope.dati.difficolta, $scope.dati.tempo, $scope.dati.tag,
                                                $scope.dati.ingrediente).then(function(ref){
                    var postId = ref.key;
                    $scope.dati.userInfo = InsertPostService.getUserInfo($scope.dati.userId);
                    InsertPostService.updatePost(postId);
                    $scope.dati.descrizione = "";
                    $scope.dati.titolo= "";
                    $scope.dati.procedimento = "";
                    $scope.dati.difficolta = "" ;
                    $scope.dati.tempo = "" ;
                    $scope.dati.tag = "";
                    $scope.dati.ingrediente = "";

                    console.log("hai aggiunto un post");
                    // SERVE PER CHIUDERE IL MODAL
                    var modalDiv = $("#modalPost");
                    modalDiv.modal('hide');
                    var modalDiv = $("#modalRicetta");
                    modalDiv.modal('hide');


                });


            } ;

            //  LISTA DINAMICA PER L'INSERIMENTO DEGLI INGREDIENTI
                $(document).on('click', '.btn-add', function(e){
                    e.preventDefault();

                    var controlForm = $('.controls span:first'),
                        currentEntry = $(this).parents('.entry').filter(":first"),
                        newEntry = currentEntry.clone().appendTo(controlForm);

                    newEntry.find('input').val('');
                    controlForm.find('.entry:not(:last) .btn-add')
                        .removeClass('btn-add').addClass('btn-remove')
                        .removeClass('btn-success').addClass('btn-danger')
                        .html('<span class="glyphicon glyphicon-minus"></span>');
                });
                $(document).on('click', '.btn-remove', function(e)
                {
                    $(this).parents('.entry:first').remove();

                    e.preventDefault();
                    return false;
                 });

            //
            // function conto() {
            //     var x = document.getElementById("ingrd").lenght;
            //     console.log(x);
            // }


            $scope.setTag = function (nometag)
            {
                $scope.dati.tag = nometag;
            };

        } ]);


