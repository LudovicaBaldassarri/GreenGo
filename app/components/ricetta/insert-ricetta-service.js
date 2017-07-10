'use strict';

angular.module('myApp.ricetta.insertRicettaService', [])

    .factory('InsertRicettaService', function($firebaseArray) {
        var newRicettaService = {

            getUserInfo: function(userId) {
                var userRef = firebase.database().ref().child("users").child(userId);
                return $firebaseArray(userRef);
            },

        /*

         insertNewRicetta: function(autoreId, name, descrizione, titolo, procedimento) {
         var ref = firebase.database().ref().child("ricettas");
         return $firebaseArray(ref).$add({
         autoreId: autoreId,
         name: name,
         descrizione: descrizione,
         titolo: titolo,
         procedimento: procedimento
         });
         },
            OPPURE
            deve ricevere gli attributi di posts in firebase???

          */

            insertNewRicetta: function(autoreId, id_details, nome_autore, nome_post) {
                var ref = firebase.database().ref().child("ricettas");
                return $firebaseArray(ref).$add({
                    autoreId: autoreId,
                    id_details: id_details,
                    nome_autore: nome_autore,
                    nome_post: nome_post
                });
            },


            //   riceve postId o ricettaId?
            updateRicetta: function() {
            }

        };
        return newRicettaService;
    });

