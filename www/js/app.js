// Ionic Parse Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'ionicParseApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'ionicParseApp.controllers' is found in controllers.js
angular.module('Turnup',
    [ 'ionic', 'Turnup.controllers' ]
)
    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('welcome', {
                url: '/welcome?clear',
                templateUrl: 'templates/welcome.html',
                controller: 'WelcomeController',
                data: {
                    authenticate: false
                }
            })

            .state('login', {
                url: '/login?clear',
                templateUrl: 'templates/login.html',
                controller: 'LoginController',
                data: {
                    authenticate: false
                }
            })

            .state('forgot', {
                url: '/forgot?clear',
                templateUrl: 'templates/forgotPassword.html',
                controller: 'ForgotPasswordController',
                data: {
                    authenticate: false
                }
            })

            .state('register', {
                url: '/register?clear',
                templateUrl: 'templates/register.html',
                controller: 'RegisterController',
                data: {
                    authenticate: false
                }
            })

            .state('app', {
                url: '/app?clear',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppController'
            })

            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home.html',
                        controller: 'HomeController'
                    }
                }
            })

            .state('app.partyEdit', {
                url: '/partyEdit',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/partyEdit.html',
                        controller: 'PartyEditController'
                    }
                }
            })

            .state('app.settings', {
                url: '/settings',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/settings.html',
                        controller: 'SettingsController'
                    }
                }
            })


        $urlRouterProvider.otherwise('/welcome');
    })
    .run(function ($state, $rootScope) {
        Parse.initialize('LqvgxiQNacPneMjUhYJUrEAjZ7dkzLf2mCRq1FPY', '9r6qrhT5waicRbK6fG9jyxMgUotLySDgYdN5eUTo');
        var currentUser = Parse.User.current();
        $rootScope.user = null;
        $rootScope.isLoggedIn = false;

        if (currentUser) {
            $rootScope.user = currentUser;
            $rootScope.isLoggedIn = true;
            $state.go('app.home');
        }
    });

