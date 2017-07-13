
'use strict';
angular.module('myApp.prodotto.insertProdottoService', [])

    .factory('InsertProdottoService', function($firebaseArray) {
        var newProdottoService = {

            getUserInfo : function(userId) {
                var userRef = firebase.database().ref().child("users").child(userId);
                return $firebaseArray(userRef);
            },

            insertNewProdotto: function (autoreId, nomeProduttore, img_url, descrizione, prezzo, date, dataStampa, oraStampa,
                                     nomeProdotto, categoria, imgPath, cittaProduttore){
                var ref=firebase.database().ref().child("products");
                return $firebaseArray(ref).$add({
                    autoreId: autoreId,
                    nomeProduttore: nomeProduttore,
                    autore_img: img_url,
                    descrizione: descrizione,
                    prezzo: prezzo,
                    date: date,
                    dataStampa: dataStampa,
                    oraStampa: oraStampa,
                    nomeProdotto: nomeProdotto,
                    categoria: categoria,
                    img_url: imgPath,
                    cittaProduttore: cittaProduttore
                });
            },
            updateProdotto: function(prodottoId) {
                var ref = firebase.database().ref().child("products").child(prodottoId);
                ref.update({
                    id: prodottoId
                });
            }
        };
        return newProdottoService;
    });