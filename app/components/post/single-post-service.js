'use strict';

angular.module('myApp.post.singlePostService', [])

    .factory('SinglePost', function ($firebaseObject) {
        var singlePostService= {
            getSinglePost: function(postId){
                var ref = firebase.database().ref().child("posts").child(postId);
                return $firebaseObject(ref);
            }

        };
        return singlePostService;

    });
