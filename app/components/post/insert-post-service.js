
'use strict';
angular.module('myApp.post.insertPostService', [])

    .factory('InsertPostService', function($firebaseArray) {
        var newPostService = {

            getUserInfo : function(userId) {
                 var userRef = firebase.database().ref().child("users").child(userId);
                 return $firebaseArray(userRef);
            },

            insertNewPost: function (autoreId, name, surname, img_url, descrizione, date, dataStampa, oraStampa,
                                       titolo, procedimento, difficolta, tempoP, tempoC, tag, imgPath,  ingrediente1, ingrediente2,
                                        ingrediente3, ingrediente4, ingrediente5, ingrediente6, ingrediente7,
                                     ingrediente8, ingrediente9, ingrediente10){
                var ref=firebase.database().ref().child("posts");
                return $firebaseArray(ref).$add({
                    autoreId: autoreId,
                    name: name,
                    surname: surname,
                    autore_img: img_url,
                    descrizione: descrizione,
                    date: date,
                    dataStampa: dataStampa,
                    oraStampa: oraStampa,
                    titolo: titolo,
                    procedimento: procedimento,
                    difficolta: difficolta,
                    tempoP: tempoP,
                    tempoC: tempoC,
                    tag: tag,
                    img_url: imgPath,
                    "ingredienti":{
                    ingrediente1: ingrediente1,
                    ingrediente2: ingrediente2,
                    ingrediente3: ingrediente3,
                    ingrediente4: ingrediente4,
                    ingrediente5: ingrediente5,
                    ingrediente6: ingrediente6,
                    ingrediente7: ingrediente7,
                    ingrediente8: ingrediente8,
                    ingrediente9: ingrediente9,
                    ingrediente10: ingrediente10}
                    //"elemento":{ingrediente: ingrediente}
                });
            },
            updatePost: function(postId) {
                var ref = firebase.database().ref().child("posts").child(postId);
                ref.update({
                    id: postId
                });
            }
        };
        return newPostService;
    });