'use strict'

angular.module('myApp.users.postVoteService', [])

    .factory('PostVoteService', function postVoteService($firebaseArray, $firebaseObject) {
        var NewPostVoteService = {
            getVoters: function() {
                var ref = firebase.database().ref().child("voters");
                return $firebaseArray(ref);
            },
            // getPostInfo: function(postId) {
            //     var Ref = firebase.database().ref().child("saves").child(postId);
            //     return $firebaseObject(Ref);
            // },
            insertNewVotedPost: function (postId, voterId, post_name, post_autore) {
                //add the critica to list of critucs and set the logged value to true
                var ref = firebase.database().ref().child("voters");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    postId: postId,
                    voter: voterId,
                    post_name: post_name,
                    post_autore: post_autore
                });
            },
            updateVoteSaved: function (voterId) {
                var ref = firebase.database().ref().child("voters").child(voterId);
                ref.update({
                    id: voterId
                });
            },
            deleteVoted: function (voterId) {
                var refDel = firebase.database().ref().child("voters").child(voterId);
                refDel.remove();
            }
        };
        return NewPostVoteService;
    });