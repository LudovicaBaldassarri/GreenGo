
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
                        strumento10: strumento10},
                    "savers":{
                        id_salvatore: "inizializzazione"
                    }
                });
            },

            condividiRicetta: function (postId, condividerId, condividerName, condividerSurname, condivider_img, autoreId, nameAutore, surnameAutore,
                                        autore_img, descrizione, dataStampa, oraStampa, titolo, categoria, condivisione) {
                var ref=firebase.database().ref().child("posts");
                return $firebaseArray(ref).$add({
                    postId: postId,
                    condividerId: condividerId,
                    condividerName: condividerName,
                    condividerSurname: condividerSurname,
                    condivider_img: condivider_img,
                    autore_Id: autoreId,
                    nameAutore: nameAutore,
                    surnameAutore: surnameAutore,
                    autore_img: autore_img,
                    descrizione: descrizione,
                    dataStampa: dataStampa,
                    oraStampa: oraStampa,
                    titolo: titolo,
                    tag: "condiviso",
                    categoria: categoria,
                    condivisione: condivisione
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
            },
            setNumCommenti: function(postId){
                var ref = firebase.database().ref().child("posts").child(postId);
                ref.update({
                    numCommenti: 1
                });
            },
            updateNumCommenti: function (postId, num) {
                var ref = firebase.database().ref().child("posts").child(postId);
                ref.update({
                    numCommenti: num+1
                });
            },


            setVegetariana: function(postId, vegetariana, vegana) {
                var ref = firebase.database().ref().child("posts").child(postId);
                if(vegetariana || vegana){
                    ref.update({
                        vegetariana: "Vegetariana"
                    });
                } else {ref.update({
                    vegetariana: ""
                });}

            },

            setVegana: function(postId, vegana) {
                var ref = firebase.database().ref().child("posts").child(postId);
                if(vegana){
                    ref.update({
                        vegana: "Vegana"
                    });
                } else {ref.update({
                    vegana: ""
                });}

            },

            setSenzaGlutine: function(postId, senzaglutine) {
                var ref = firebase.database().ref().child("posts").child(postId);
                if(senzaglutine){
                    ref.update({
                        senzaglutine: "Senza Glutine"
                    });
                } else {ref.update({
                    senzaglutine: ""
                });}
            }


        };
        return newPostService;
    });