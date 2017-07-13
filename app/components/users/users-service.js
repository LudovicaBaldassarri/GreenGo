'use strict';

//The service implemented in this module will save the status of the user (logged or not logged) ad will save user info at first registration
angular.module('myApp.users.usersService', [])

    .factory('Users', function($firebaseArray) {
        return {
            registerLogin: function (userId, email) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("users").child(userId);
                // create a synchronized array
                ref.update({
                    email: email,
                    logged: true
                });
            },
            registerLogout: function (userId)
            {
                var ref = firebase.database().ref().child("users").child(userId);
                // create a synchronized array
                ref.update({
                    logged: false
                });
            },
            registerNewUserInfo: function (userId, name, surname, email, tipo) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("users").child(userId);
                // create a synchronized array
                ref.set({
                    id: userId,
                    name: name,
                    surname: surname,
                    email: email,
                    tipo: "",
                    img_url: "https://firebasestorage.googleapis.com/v0/b/greengo-a9d21.appspot.com/o/userImages%2FDefault.png?alt=media&token=35b74c3d-69a4-4c0c-bd7a-603ca2ade81c"
                });
            },
            updateTipo: function (userId) {
                var ref = firebase.database().ref().child("users").child(userId);
                ref.update({
                    tipo: 'produttore'
                });
            },

            updateImage: function (userId, imgPath) {
                var iRef = firebase.database().ref().child("users").child(userId);
                iRef.update({
                    img_url: imgPath,
                    img_alt: userId
                });
            },
            updateProduttore: function (userId, nomeProduttore, citta, descrizione, img_produttore) {
                var ref = firebase.database().ref().child("users").child(userId);
                ref.update({
                    nomeProduttore: nomeProduttore,
                    citta: citta,
                    descrizione: descrizione,
                    img_produttore: img_produttore
                });
            },
            updateInfo: function (userId, dataNascita, cittaVive, descPersonale) {
                var ref = firebase.database().ref().child("users").child(userId);
                ref.update({
                    dataNascita: dataNascita,
                    cittaVive: cittaVive,
                    descPersonale: descPersonale
                });
            },
            updateUser: function(userId) {
                var ref = firebase.database().ref().child("users").child(userId);
                ref.update({
                    id: userId
                });
            }
            // getPunteggio: function (userId) {
            //     var userRef = firebase.database().ref().child("users").child(userId).child('punti');
            //     return userRef;
            // },
            // setPunteggio: function(userId){
            //     var ref = firebase.database().ref().child("users").child(userId);
            //     ref.update({
            //         punti: 1
            //     });
            // }

        };
    });

