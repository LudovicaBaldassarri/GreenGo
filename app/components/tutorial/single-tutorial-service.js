'use strict'

angular.module('myApp.tutorial.singleTutorialService', [])

.factory('SingleTutorial', function($firebaseObject) {
    var singleTutorialService = {
        getSingleTutorial: function(tutorialId) {
            var ref = firebase.database().ref().child("tutorials").child(tutorialId);
            return $firebaseObject(ref);
        }
    };
    return singleTutorialService;
});