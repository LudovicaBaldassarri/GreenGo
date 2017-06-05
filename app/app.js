'use strict';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCry-tbpb3l8cnc8r8DCgamjBA6lFS6QxA",
    authDomain: "greengo-a9d21.firebaseapp.com",
    databaseURL: "https://greengo-a9d21.firebaseio.com",
    projectId: "greengo-a9d21",
    storageBucket: "greengo-a9d21.appspot.com",
    messagingSenderId: "1025412889454"
};
firebase.initializeApp(config);

// Declare app level module which depends on views, and components
angular.module('myApp', [
    "firebase",
  'ngRoute',
  'myApp.home',
  'myApp.userProfile',
  'myApp.areaRicette',
  'myApp.areaTutorial',
  'myApp.areaMercato',
  'myApp.post',
  'myApp.login',
  'myApp.authentication',
  'myApp.version',
    'myApp.users'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/home'});
}])

.run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
        // We can catch the error thrown when the $requireSignIn promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $location.path("/login");
        }
    });
}])
    .controller('MainCtrl', ['$scope', '$rootScope', '$firebaseAuth', function($scope, $rootScope, $firebaseAuth) {
        //this controller only declares a function to get information about the user status (logged in / out)
        //it is used to show menu buttons only when the user is logged

        //set the variable that is used in the main template to show the active button
        $rootScope.dati = {};
        $rootScope.dati.currentView = 'home';
        $scope.isLogged = function()
        {
            if ($firebaseAuth().$getAuth())
                return true;
            else
                return false;
        };
        $scope.logout = function () {

            //save the new status in the database (we do it before the actual logout because we can write in the database only if the user is logged in)
            Users.registerLogout(currentAuth.uid);
            //sign out
            $firebaseAuth().$signOut();
            $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
                if (firebaseUser) {
                    console.log("User is yet signed in as:", firebaseUser.uid);
                } else {
                    $location.path("/login");
                }
            });


        };
    }]);