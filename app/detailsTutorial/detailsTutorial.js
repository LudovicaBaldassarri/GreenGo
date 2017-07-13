'use strict';

angular.module('myApp.detailsTutorial', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/detailsTutorial/:postId', {
        templateUrl: 'detailsTutorial/detailsTutorial.html',
        controller: 'detailsTutorialCtrl',
        resolve: {
            // controller will not be loaded until $requireSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function(Auth) {
                // $requireSignIn returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a
                // $routeChangeError (see above)
                return Auth.$requireSignIn();
            }]
        }
    })
}])

.controller('detailsTutorialCtrl', ['$scope', '$rootScope', 'SinglePost','UsersInfo', '$routeParams', 'currentAuth','InsertPostService', 'PostSaveService', 'PostVoteService','InsertCommentoService',
        function($scope, $rootScope, SinglePost, UsersInfo, $routeParams, currentAuth, InsertPostService, PostSaveService, PostVoteService, InsertCommentoService) {
            $scope.dati = {};
            $rootScope.dati = {};
            $rootScope.dati.currentView = 'detailsTutorial';
            $scope.dati.post = SinglePost.getSinglePost($routeParams.postId);
            $scope.dati.user = UsersInfo.getUserInfo(currentAuth.uid);
            $scope.dati.userId = currentAuth.uid;
            $scope.dati.commenti = InsertCommentoService.getCommenti($routeParams.postId);
            $scope.dati.savers = PostSaveService.getSavers();
            $scope.dati.voters = PostVoteService.getVoters();
            $scope.dati.condivisione = "";

            // Iterazione per savers
            $scope.dati.notSaved = true;
            $scope.dati.savers.$loaded().then(function(){
                var saving = $scope.dati.savers;
                for (var keySingleFlowing in saving) {
                    if (!angular.isFunction(keySingleFlowing)) {
                        if (!angular.isFunction(saving[keySingleFlowing])) {
                            if (saving[keySingleFlowing]!==undefined && saving[keySingleFlowing].saver!==undefined) {
                                if ($scope.dati.userId === saving[keySingleFlowing].saver) {
                                    if ($scope.dati.post.$id === saving[keySingleFlowing].postId.id) {
                                        $scope.dati.notSaved = false;
                                    }
                                }
                            }
                        }
                    }
                }
            });
            $scope.dati.yetSaved = false;
            $scope.dati.savers.$loaded().then(function(){
                var saving = $scope.dati.savers;
                for (var keySingleFlowing in saving) {
                    if (!angular.isFunction(keySingleFlowing)) {
                        if (!angular.isFunction(saving[keySingleFlowing])) {
                            if (saving[keySingleFlowing]!==undefined && saving[keySingleFlowing].saver!==undefined) {
                                if ($scope.dati.userId === saving[keySingleFlowing].saver) {
                                    if ($scope.dati.post.$id === saving[keySingleFlowing].postId.id) {
                                        $scope.dati.Saving = saving[keySingleFlowing].id;
                                        $scope.dati.yetSaved = true;
                                    }
                                }
                            }
                        }
                    }
                }
                return false;
            });

            $scope.saveTutorial = function() {
                PostSaveService.insertNewSavedPost($scope.dati.post, $scope.dati.userId, $scope.dati.post.titolo, $scope.dati.post.name).then(function (ref) {
                    var refy = ref.key;
                    PostSaveService.updatePostSaved(refy);
                    $scope.dati.notSaved = false;
                    $scope.dati.yetSaved = true;

                });
            };

            $scope.removeSaver = function (userId) {
                PostSaveService.deleteSaved(userId);
                $scope.dati.notSaved = true;
                $scope.dati.yetSaved =false;
            };

            $scope.dati.commento = "";

            //salva la data di oggi e la inserisce come attributo nel firebase del post
            $scope.dati.date = new Date();
            //scompone la data completa in gg/mm/aaa da stampare in html quando serve
            var month = $scope.dati.date.getUTCMonth() + 1;
            $scope.dati.dataStampa = $scope.dati.date.getUTCDate() + "/" + month + "/" + $scope.dati.date.getUTCFullYear();
            //scompone l0ora da date in hh:mm:ss da stampare quando serve
            $scope.dati.oraStampa = $scope.dati.date.getUTCHours() + ":" + $scope.dati.date.getUTCMinutes() + ":" + $scope.dati.date.getUTCSeconds();


            //CONTROLLI VOTERS
            $scope.dati.notVoted = true;
            $scope.dati.voters.$loaded().then(function(){
                var voting = $scope.dati.voters;
                for (var keySingleFlowing in voting) {
                    if (!angular.isFunction(keySingleFlowing)) {
                        if (!angular.isFunction(voting[keySingleFlowing])) {
                            if (voting[keySingleFlowing]!==undefined && voting[keySingleFlowing].voter!==undefined) {
                                if ($scope.dati.userId === voting[keySingleFlowing].voter) {
                                    if ($scope.dati.post.$id === voting[keySingleFlowing].postId.id) {
                                        $scope.dati.notVoted = false;
                                    }
                                }
                            }
                        }
                    }
                }
            });
            $scope.dati.yetVoted = false;
            $scope.dati.voters.$loaded().then(function(){
                var voting = $scope.dati.voters;
                for (var keySingleFlowing in voting) {
                    if (!angular.isFunction(keySingleFlowing)) {
                        if (!angular.isFunction(voting[keySingleFlowing])) {
                            if (voting[keySingleFlowing]!==undefined && voting[keySingleFlowing].voter!==undefined) {
                                if ($scope.dati.userId === voting[keySingleFlowing].voter) {
                                    if ($scope.dati.post.$id === voting[keySingleFlowing].postId.id) {
                                        $scope.dati.Voting = voting[keySingleFlowing].id;
                                        $scope.dati.yetVoted = true;

                                    }
                                }
                            }
                        }
                    }
                }
                return false;
            });

            //ALGORITMO PER I VOTI STELLE
            $scope.valueUno= function () {
                $scope.dati.post.nuovoVoto = 1;
            },
                $scope.valueDue= function () {
                    $scope.dati.post.nuovoVoto = 2;
                },
                $scope.valueTre= function () {
                    $scope.dati.post.nuovoVoto = 3;
                },
                $scope.valueQuattro= function () {
                    $scope.dati.post.nuovoVoto = 4;
                },
                $scope.valueCinque= function () {
                    $scope.dati.post.nuovoVoto = 5;
                },
                $scope.addVoto= function () {
                    if($scope.dati.post.votatori == null){
                        InsertPostService.setVotatori($routeParams.postId);
                    } else {
                        InsertPostService.updateVotatori($routeParams.postId, $scope.dati.post.votatori);
                    }
                    if($scope.dati.post.voto == null){
                        InsertPostService.setVoto($routeParams.postId, $scope.dati.post.nuovoVoto);
                        $scope.dati.post.media= $scope.dati.post.nuovoVoto;
                        InsertPostService.updateMedia($routeParams.postId, $scope.dati.post.media);
                    }else {
                        InsertPostService.updateVoto($routeParams.postId, $scope.dati.post.voto, $scope.dati.post.nuovoVoto);
                        $scope.dati.post.media= parseInt(parseInt($scope.dati.post.voto )/parseInt($scope.dati.post.votatori));
                        InsertPostService.updateMedia($routeParams.postId, $scope.dati.post.media);
                    }

                    PostVoteService.insertNewVotedPost($scope.dati.post, $scope.dati.userId, $scope.dati.post.titolo, $scope.dati.post.name).then(function (ref) {
                        var refy = ref.key;
                        PostSaveService.updatePostSaved(refy);
                        $scope.dati.notVoted = false;
                        $scope.dati.yetVoted = true;

                    });
                };
            $scope.removeVoter = function (userId) {
                PostVoteService.deleteVoted(userId);
                //$scope.dati.notSaved = true;
                //$scope.dati.yetSaved =false;
            };
            // AGGIUNGE COMMENTO
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

                $scope.finalCommentoAddition = function () {
                    InsertCommentoService.insertNewCommento($scope.dati.post.$id, $scope.dati.userId, $scope.dati.user.name, $scope.dati.user.surname, $scope.dati.user.img_url,
                        $scope.dati.commento, $scope.dati.dataStampa, $scope.dati.oraStampa);

                    $scope.dati.commento = "";
                    if($scope.dati.post.numCommenti == null){
                        InsertPostService.setNumCommenti($scope.dati.post.id);
                    }else{
                        InsertPostService.updateNumCommenti($scope.dati.post.id,$scope.dati.post.numCommenti);
                    }
                };

            $scope.condividiT = function () {
                InsertPostService.condividiTutorial( $scope.dati.post.$id, $scope.dati.userId, $scope.dati.user.name, $scope.dati.user.surname, $scope.dati.user.img_url, $scope.dati.post.autoreId, $scope.dati.post.name,
                    $scope.dati.post.surname, $scope.dati.post.autore_img, $scope.dati.post.descrizione, $scope.dati.post.dataStampa, $scope.dati.post.oraStampa,
                    $scope.dati.post.titolo, $scope.dati.post.categoria, $scope.dati.condivisione).then(function (ref) {
                    var refy = ref.key;
                    //InsertPostService.updatePost($scope.dati.post.$id);
                    var modalDiv = $("#modalCondivisione");
                    modalDiv.modal('hide');
                });

            }



        }
]);