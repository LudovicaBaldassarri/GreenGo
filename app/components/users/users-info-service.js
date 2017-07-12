'use strict';

angular.module('myApp.users.usersInfoService', [])

    .factory('UsersInfo', function ($firebaseObject) {
        var usersInfoService= {
            getUserInfo: function(userId){
                var ref = firebase.database().ref().child("users").child(userId);
                return $firebaseObject(ref);
            }

            // addPostSalvato: function (userId, postId) {
            //     var ref = firebase.database().ref().child("users").child(userId).child('postSalvati').child(postId);
            //     ref.update({
            //                 post_salvato:postId
            //             });
            // },
            // getPostSalvato: function (userId, postId) {
            //     var ref = firebase.database().ref().child("users").child(userId).child('postSalvati');
            //     return $firebaseObject(ref);
            // }
        };
        return usersInfoService;
    })