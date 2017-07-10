'use strict';

angular.module('myApp.messaggio.sendMessagioService', [])

    .factory('SendMessaggioService', function($firebaseArray) {
        var newMessaggioService = {
            getUserInfo : function(userId) {
                var userRef = firebase.database().ref().child("users").child(userId);
                return $firebaseArray(userRef);
            },

            sendNewMessage : function(autoreId, nome, cognome, date, dataStampa, oraStampa, testo) {
                var ref = firebase.database().ref().child("messaggios");
                return $firebaseArray(ref).$add({
                    autoreId: autoreId,
                    nome: nome,
                    cognome: cognome,
                    date: date,
                    dataStampa: dataStampa,
                    oraStampa: oraStampa,
                    testo: testo
                });
            },
            updateMessaggio: function(messageId) {
                var ref = firebase.database().ref().child("messaggios").child(messageId);
                ref.update({
                    id: messageId
                });
            }
        };
        return newMessaggioService;
    });
