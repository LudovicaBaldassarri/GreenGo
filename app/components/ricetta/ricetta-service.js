'use strict';
angular.module('myApp.ricetta.service',
    [])
    .factory('Ricetta', function($firebaseArray) {
        var ricettaService = {
            getData: function () {
                var ref=firebase.database().ref().child("ricettas");
                return $firebaseArray(ref);
            },
            getIngredientiList: function (){
                var ref1=firebase.database().ref().child("ingredientes");
                return $firebaseArray(ref1);
            }
        };
        return ricettaService;
    });
