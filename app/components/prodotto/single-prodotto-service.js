'use strict';

angular.module('myApp.post.singleProdottoService', [])

    .factory('SingleProdotto', function ($firebaseObject) {
        var singleProdottoService= {
            getSingleProdotto: function(prodottoId){
                var ref = firebase.database().ref().child("products").child(prodottoId);
                return $firebaseObject(ref);
            }
        };
        return singleProdottoService;

    });
