 'use strict';

angular.module('myApp.ricetta.singleRicettaService', [])

.factory('SingleRicetta', function ($firebaseObject) {
    var singleRicettaService= {
        getSingleRicetta: function(ricettaId){
            var ref = firebase.database().ref().child("ricettas").child(ricettaId);
            return $firebaseObject(ref);
        }
    };
    return singleRicettaService;
})
