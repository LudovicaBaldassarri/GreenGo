'use strict';

angular.module('myApp.users.usersInfoService', [])

    .factory('UsersInfo', function ($firebaseObject) {
        var usersInfoService= {
            getUserInfo: function(userId){
                var ref = firebase.database().ref().child("users").child(userId);
                return $firebaseObject(ref);
            }
        };
        return usersInfoService;
    })
