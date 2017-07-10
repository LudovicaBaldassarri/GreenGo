'use strict';

angular.module('myApp.messaggio.singleMessaggioService', [])

    .factory('SingleMessaggio', function($firebaseObject) {
        var singleMessaggio = {
            getSingleMessaggio : function (messageId) {
                var ref = firebase.database().ref().child("messaggios").child(messageId);
                return $firebaseObject(ref);
            }
        };
            return singleMessaggio;
    });
