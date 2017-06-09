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
    'myApp.post',
    'myApp.login',
    'myApp.authentication',
    'myApp.users',
  'myApp.userProfile',
  'myApp.areaRicette',
  'myApp.areaTutorial',
  'myApp.areaMercato',
  'myApp.authentication',
  'myApp.version'

])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
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
    //$scope', '$rootScope', 'Auth', '$location', '$log', 'Users',
    .controller('MainCtrl', ['$scope', '$rootScope', '$firebaseAuth', 'Users','Auth', '$location', '$log',
        function($scope, $rootScope, $firebaseAuth, Users, Auth, $location, $log) {
        //this controller only declares a function to get information about the user status (logged in / out)
        //it is used to show menu buttons only when the user is logged
        // $scope.dati={};
        $rootScope.dati = {};
        $rootScope.dati.currentView = 'home';
        $scope.isLogged = function()
        {
            if ($firebaseAuth().$getAuth()){
                return true;}
            else
            {return false;}
        };
        $scope.isNotLogged = function(){
            if ($firebaseAuth().$getAuth()){
                return false;
            } else {return true;}
        };
        $scope.logout = function () {

            //save the new status in the database (we do it before the actual logout because we can write in the database only if the user is logged in)
            Users.registerLogout($firebaseAuth().$getAuth().uid);
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
        $scope.user={};
        $scope.auth = Auth; //acquires authentication from app.js (if it was done)

        //this function will be called when the "Login" button will be pressed
        $scope.signIn = function() {
            //initialize variables
            $scope.firebaseUser = null;
            $scope.error = null;
            //set the variable that is used in the main template to show the active button
            // $rootScope.dati.currentView = "home";
            $scope.auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
                var userId = firebaseUser.uid;
                Users.registerLogin(userId, $scope.user.email);

                $location.path("/home");
            }).catch(function(error) {
                $scope.error = error;
                $log.error(error.message);
            });
        };
    }]);