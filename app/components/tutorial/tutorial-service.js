'use strict';

angular.module('myApp.tutorial.service', [])

    .factory('Tutorial', function($firbaseArray) {
        var tutorialService = {
            getData: function () {
                var ref=firebase.database().ref().child("tutorials");
                return $firebaseArray(ref);
            }
        };
        return tutorialService;
    });
