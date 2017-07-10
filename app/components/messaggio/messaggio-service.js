'use strict';

angular.module('myApp.messaggio.service', [])

    .factory('Messaggio', function ($firebaseArray) {
        var messaggioService = {
            getData: function () {
                var ref=firebase.database().ref().child("messaggios");
                return $firebaseArray(ref);
            }
        };
        return messaggioService;
    });