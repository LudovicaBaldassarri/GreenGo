'use strict';
angular.module('myApp.prodotto.service',
    [])
    .factory('Prodotto', function($firebaseArray) {
        var prodService = {
            getData: function () {
                var ref=firebase.database().ref().child("products");
                return $firebaseArray(ref);
            }
        };
        return prodService;
    });
