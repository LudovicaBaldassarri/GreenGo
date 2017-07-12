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

.controller('detailsTutorialCtrl', ['$scope', '$rootScope', 'SinglePost', '$routeParams', 'currentAuth','InsertPostService', 'PostSaveService',
        function($scope, $rootScope, SinglePost, $routeParams, currentAuth, InsertPostService, PostSaveService) {
            $scope.dati = {};
            $rootScope.dati = {};
            $rootScope.dati.currentView = 'detailsTutorial';
            $scope.dati.post = SinglePost.getSinglePost($routeParams.postId);
            $scope.dati.userId = currentAuth.uid;
            $scope.dati.savers = PostSaveService.getSavers();

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

            $scope.saveRicetta = function() {
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
                    var form = $("#formVota");
                    form.hide();
                    var voto = $("#miovoto");
                    voto.show();

                };
        }
]);