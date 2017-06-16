
'use strict';
angular.module('myApp.post.insertPostService', [])

    .factory('InsertPostService', function($firebaseArray) {
        var newPostService = {

            getUserInfo : function(userId) {
                 var userRef = firebase.database().ref().child("users").child(userId);
                 return $firebaseArray(userRef);
            },

            insertNewPost: function (autoreId, name, surname, descrizione, date, dataStampa, oraStampa,
                                       titolo, procedimento, difficolta, tempo, tag){
                var ref=firebase.database().ref().child("posts");
                return $firebaseArray(ref).$add({
                    autoreId: autoreId,
                    name: name,
                    surname: surname,
                    descrizione: descrizione,
                    date: date,
                    dataStampa: dataStampa,
                    oraStampa: oraStampa,
                    titolo: titolo,
                    procedimento: procedimento,
                    difficolta: difficolta,
                    tempo: tempo,
                    tag: tag
                });
            },
            updatePost: function(postId) {
                var ref = firebase.database().ref().child("posts").child(postId);
                ref.update({
                    id: postId
                });
            }
        };
        return newPostService;
    });