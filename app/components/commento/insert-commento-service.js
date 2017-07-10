'use strict';

angular.module('myApp.commento.insertCommentoService', [])

    .factory('InsertCommentoService', function($firebaseArray) {
        var newCommentoService = {

            getUserInfo : function(postId) {
                 var postRef = firebase.database().ref().child("posts").child(postId);
                 return $firebaseArray(postRef);
            },

            insertNewCommento: function (autoreId, name, surname, img_url, testo, date, dataStampa, oraStampa){
                var ref=firebase.database().ref().child("posts").child("comments");
                return $firebaseArray(ref).$add({
                    autoreId: autoreId,
                    name: name,
                    surname: surname,
                    autore_img: img_url,
                    descrizione: testo,
                    date: date,
                    dataStampa: dataStampa,
                    oraStampa: oraStampa
                });
            },
            updateCommento: function(commentoId) {
                var ref = firebase.database().ref().child("posts").child("comments").child(commentoId);
                ref.update({
                    id: commentoId
                });
            }
        };
        return newCommentoService;
    });