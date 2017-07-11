'use strict';

angular.module('myApp.messaggio.sendMessaggioService', [])

    .factory('SendMessaggioService', function($firebaseArray) {
        var newMessaggioService = {
            getUserInfo : function(userId) {
                var userRef = firebase.database().ref().child("users").child(userId);
                return $firebaseArray(userRef);
            },

            sendNewMessage : function(autoreId, destinatarioId, nome, cognome, img_url, date, dataStampa, oraStampa, testo) {
                var ref = firebase.database().ref().child("messaggios");
                return $firebaseArray(ref).$add({
                    autoreId: autoreId,
                    destinatarioId: destinatarioId,
                    nome: nome,
                    cognome: cognome,
                    img_url: img_url,
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
            },
            getMessaggi: function () {
                var messaggiRef = firebase.database().ref().child("messaggios");
                return $firebaseArray(messaggiRef);
            }
        };
        return newMessaggioService;
    });
