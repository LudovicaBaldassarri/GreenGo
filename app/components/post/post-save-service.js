'use strict'

angular.module('myApp.users.postSaveService', [])

    .factory('PostSaveService', function postSaveService($firebaseArray, $firebaseObject) {
        var NewPostSaveService = {
            getSavers: function() {
                var ref = firebase.database().ref().child("savers");
                return $firebaseArray(ref);
            },
            // getPostInfo: function(postId) {
            //     var Ref = firebase.database().ref().child("saves").child(postId);
            //     return $firebaseObject(Ref);
            // },
            insertNewSavedPost: function (postId, saverId, post_name, post_autore) {
                //add the critica to list of critucs and set the logged value to true
                var ref = firebase.database().ref().child("savers");
                // create a synchronized array
                return $firebaseArray(ref).$add({
                    postId: postId,
                    saver: saverId,
                    post_name: post_name,
                    post_autore: post_autore
                });
            },
            updatePostSaved: function (saverId) {
                var ref = firebase.database().ref().child("savers").child(saverId);
                ref.update({
                    id: saverId
                });
            },
            deleteSaved: function (saverId) {
                var refDel = firebase.database().ref().child("savers").child(saverId);
                refDel.remove();
            }
        };
        return NewPostSaveService;
    });