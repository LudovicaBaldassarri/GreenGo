
'use strict';
angular.module('myApp.post.insertPostService', [])

    .factory('InsertPostService', function($firebaseArray) {
        var newPostService = {

            getUserInfo : function(userId) {
                 var userRef = firebase.database().ref().child("users").child(userId);
            },


            insertNewPost: function (autoreId, descrizione) {
                var ref=firebase.database().ref().child("posts");
                return $firebaseArray(ref).$add({
                    autoreId: autoreId,
                    descrizione: descrizione,

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