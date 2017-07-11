'use strict'

angular.module('myApp.users.usersFollowService', [])

    .factory('UsersFollowService', function usersFollowService($firebaseArray, $firebaseObject) {
        var NewUsersFollowService = {
            getFollow: function() {
                var ref = firebase.database().ref().child("follows");
                return $firebaseArray(ref);
            },
            getUserInfo: function(userId) {
                var userRef = firebase.database().ref().child("users").child(userId);
                return $firebaseObject(userRef);
            },
            insertNewUsersFollow: function (follower, followed, followedName, button) {
                //add the critica to list of critucs and set the logged value to true
                var ref = firebase.database().ref().child("follows");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    follower: follower,
                    followed: followed,
                    followedName: followedName,
                    button: button
                });
            },
            updateUsersFollow: function (followId) {
                var ref = firebase.database().ref().child("follows").child(followId);
                ref.update({
                    id: followId
                });
            },
            deleteFollow: function (followId) {
                var refDel = firebase.database().ref().child("follows").child(followId);
                refDel.remove();
            }
        };
        return NewUsersFollowService;
    });
