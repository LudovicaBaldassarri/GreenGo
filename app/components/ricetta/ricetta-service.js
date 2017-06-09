'use strict';
angular.module('myApp.ricetta.service',
    [])
    .factory('Ricetta', function($firebaseArray) {
        var ricettaService = {
            getData: function () {
                var ref=firebase.database().ref().child("ricettas");
                return $firebaseArray(ref);
            }
        };
        return ricettaService;
    });
