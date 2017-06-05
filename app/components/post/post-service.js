'use strict'; angular.module('myApp.post.service',
    [])
    .factory('Post', function($firebaseArray) {
        var postService = {
            getData: function () {
                var ref=firebase.database().ref().child("posts");
                return $firebaseArray(ref);
            }
        };
        return postService;
    });
