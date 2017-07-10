
'use strict';
angular.module('myApp.post.insertPostService', [])

    .factory('InsertPostService', function($firebaseArray) {
        var newPostService = {

            getUserInfo : function(userId) {
                 var userRef = firebase.database().ref().child("users").child(userId);
                 return $firebaseArray(userRef);
            },

            insertNewPost: function (autoreId, name, surname, img_url, descrizione, date, dataStampa, oraStampa,
                                       titolo, procedimento, categoria, dieta, difficolta, tempoP, tempoC, tag, imgPath,
                                     ingrediente1, ingrediente2,
                                        ingrediente3, ingrediente4, ingrediente5, ingrediente6, ingrediente7,
                                     ingrediente8, ingrediente9, ingrediente10, strumento1, strumento2, strumento3,
                                     strumento4, strumento5, strumento6, strumento7, strumento8, strumento9,
                                     strumento10){
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
                    categoria: categoria,
                    dieta: dieta,
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
                    ingrediente10: ingrediente10},
                    "strumenti":{
                        strumento1: strumento1,
                        strumento2: strumento2,
                        strumento3: strumento3,
                        strumento4: strumento4,
                        strumento5: strumento5,
                        strumento6: strumento6,
                        strumento7: strumento7,
                        strumento8: strumento8,
                        strumento9: strumento9,
                        strumento10: strumento10}
                });
            },
            updatePost: function(postId) {
                var ref = firebase.database().ref().child("posts").child(postId);
                ref.update({
                    id: postId
                });
            },
            setVoto: function(postId, voto) {
                var ref = firebase.database().ref().child("posts").child(postId);
                ref.update({
                    voto:voto
                });
            },
            updateVoto: function (postId, voto, nuovoVoto) {
                var ref = firebase.database().ref().child("posts").child(postId);
                ref.update({
                    voto: parseInt(parseInt(voto)+ parseInt(nuovoVoto))
                });
            },
            setVotatori: function(postId){
                var ref = firebase.database().ref().child("posts").child(postId);
                ref.update({
                    votatori: 1
                });
            },
            updateVotatori: function (postId, votatori) {
                var ref = firebase.database().ref().child("posts").child(postId);
                ref.update({
                    votatori: votatori+1
                });
            },
            updateMedia: function (postId, media) {
                var ref = firebase.database().ref().child("posts").child(postId);
                ref.update({
                    media: media
                });
            }
        };
        return newPostService;
    });