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
    'myApp.commento',
    'myApp.messaggio',
    'myApp.prodotto',
    'myApp.ricetta',
    'myApp.tutorial',
    'myApp.login',
    'myApp.authentication',
    'myApp.users',
    'myApp.userProfile',
    'myApp.areaRicette',
    'myApp.areaTutorial',
    'myApp.areaMercato',
    'myApp.detailsRicetta',
    'myApp.detailsTutorial',
    'myApp.version',
    'myApp.otherUserProfile',
     'myApp.paginaProduttore',
    'myApp.otherProduttore',
     'myApp.fileUpload'

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
    .controller('MainCtrl', ['$scope', '$rootScope', '$firebaseAuth', 'Users','Auth', '$location', '$log', '$firebaseStorage',
        function($scope, $rootScope, $firebaseAuth, Users, Auth, $location, $log, $firebaseStorage) {
        //this controller only declares a function to get information about the user status (logged in / out)
        //it is used to show menu buttons only when the user is logged
        // $scope.dati={};
        $rootScope.dati = {};
        $rootScope.dati.currentView = 'home';
        // DATI PER IMMAGINE
        $scope.dati.feedback = "";

        // var ctrl = this;
        // $scope.fileToUpload = null;
        // $scope.imgPath= "";

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

                // SERVE PER CHIUDERE IL MODAL
                var modalDiv = $("#myModal");
                modalDiv.modal('hide');

                $location.path("/home");
            }).catch(function(error) {
                $scope.error = error;
                $log.error(error.message);
            });
        };
            $scope.signUp = function() {
                //check if the second password is equal to the first one
                if ($scope.user.password!= '' && $scope.user.password === $scope.user.password2) {
                    //create a new user with specified email and password
                    Auth.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
                        .then(function (firebaseUser) {
                            //after creating the user, we will perform a login and then the new information will be saved in the database
                            //(the reason is that we cannot write in the database if we are not logged in ... it is not the best way of doing it but it is ok for our prototype)
                            Auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(internalFirebaseUser) {
                                var userId = internalFirebaseUser.uid;
                                Users.registerNewUserInfo(userId, $scope.user.name, $scope.user.surname, $scope.user.email);
                                Users.registerLogin(userId, $scope.user.email);
                                // SERVE PER CHIUDERE IL MODAL
                                var modalDiv = $("#myModal2");
                                modalDiv.modal('hide');

                                $location.path("/home");
                            }).catch(function(error) {
                                $scope.error = error;
                                console.log(error.message);
                            });
                        }).catch(function (error) {
                        $scope.error = error;
                        console.log(error.message);
                    });
                }
            };


    }]);
/*.controller('UserRegistrationCtrl', ['$scope', '$rootScope', 'Auth', 'Users', '$location', function($scope, $rootScope, Auth, Users, $location) {
 $scope.user={};
 //set the variable that is used in the main template to show the active button
 $rootScope.dati.currentView = "home";
 $scope.signUp = function() {
 //check if the second password is equal to the first one
 if ($scope.user.password!= '' && $scope.user.password === $scope.user.password2) {
 //create a new user with specified email and password
 Auth.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
 .then(function (firebaseUser) {
 //after creating the user, we will perform a login and then the new information will be saved in the database
 //(the reason is that we cannot write in the database if we are not logged in ... it is not the best way of doing it but it is ok for our prototype)
 Auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(internalFirebaseUser) {
 var userId = internalFirebaseUser.uid;
 Users.registerNewUserInfo(userId, $scope.user.name, $scope.user.surname, $scope.user.email);
 Users.registerLogin(userId, $scope.user.email);
 // login successful: redirect to the pizza list
 $location.path("/pizzaView");
 }).catch(function(error) {
 $scope.error = error;
 console.log(error.message);
 });
 }).catch(function (error) {
 $scope.error = error;
 console.log(error.message);
 });
 }
 };
 }]);*/