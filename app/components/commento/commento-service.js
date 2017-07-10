'use strict';
angular.module('myApp.commento.service',
    [])
    .factory('Commento', function($firebaseArray) {
        var commentoService = {
            getData: function () {
                var ref=firebase.database().ref().child("posts").child("comments");
                return $firebaseArray(ref);
            }
            // ,
            // deletePost : function (postId) {
            //     var ref = firebase.database().ref().child("posts").child(postId);
            //     ref.remove();
            // }
        };
        return commentoService;

    });
