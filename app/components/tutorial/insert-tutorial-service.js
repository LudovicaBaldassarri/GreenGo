'use strict';

angular.module('myApp.tutorial.insertTutorialService', [])

    .factory('InsertTutorialService', function ($firebaseArray) {
        var newTutorialService = {

            getUserInfo: function(userId) {
                var userRef = firebase.database().ref().child("users").child(userId);
                return $firebaseArray(userRef);
            },

            insertNewRicetta: function(autoreId, id_details, nome_autore, nome_post) {
                var ref = firebase.database().ref.child("tutorials");
                return $firebaseArray(ref).$add({
                    autoreId: autoreId,
                    id_details: id_details,
                    nome_autore: nome_autore,
                    nome_post: nome_post
                });
            },

            updateTutorial: function() {
            }

        };
        return newTutorialService;
    });
