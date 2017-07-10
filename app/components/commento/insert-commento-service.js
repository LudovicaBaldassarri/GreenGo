'use strict';

angular.module('myApp.commento.insertCommentoService', [])

    .factory('InsertCommentoService', function($firebaseArray) {
        var newCommentoService = {

            getUserInfo : function(postId) {
                 var postRef = firebase.database().ref().child("posts").child(postId);
                 return $firebaseArray(postRef);
            },

            insertNewCommento: function (postId, autoreId, name, surname, img_url, testo, dataStampa, oraStampa){
                var ref=firebase.database().ref().child("posts").child(postId).child("commenti").child(testo + oraStampa);
                ref.update({
                    id:name,
                    autoreId: autoreId,
                    name: name,
                    surname: surname,
                    autore_img: img_url,
                    descrizione: testo,
                    dataStampa: dataStampa,
                    oraStampa: oraStampa
                });
            },

            updateCommento: function(commentoId) {
                var ref = firebase.database().ref().child("posts").child("comments").child(commentoId);
                ref.update({
                    id: commentoId
                });
            },

            getCommenti: function (postId) {
                var commentiRef = firebase.database().ref().child("posts").child(postId).child("commenti");
                return $firebaseArray(commentiRef);
            }
        };
        return newCommentoService;
    });