angular.module('Turnup.controllers', [])

    .controller('AppController', function($scope, $state, $rootScope, $ionicHistory, $stateParams) {
        if ($stateParams.clear) {
            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();
        }

        $scope.logout = function() {
            Parse.User.logOut();
            $rootScope.user = null;
            $rootScope.isLoggedIn = false;
            $state.go('welcome', {
                clear: true
            });
        };
    })

    .controller('WelcomeController', function($scope, $state, $rootScope, $ionicHistory, $stateParams) {
        if ($stateParams.clear) {
            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();
        }

        $scope.login = function() {
            $state.go('login');
        };

        $scope.signUp = function() {
            $state.go('register');
        };

        if ($rootScope.isLoggedIn) {
            $state.go('app.home');
        }
    })

    .controller('HomeController', function($scope, $state, $rootScope, $ionicNavBarDelegate) {

        $scope.parties = [];

        var Party = Parse.Object.extend("Party");
        var query = new Parse.Query(Party);

        query.find({
            success: function(results) {

                $scope.$apply(function() {
                    $scope.parties = results.map(function(obj) {
                        return {
                            title: obj.get("title"),
                            date: obj.get("date"),
                            location: obj.get("location"),
                            description: obj.get("description"),
                            attendanceCount: obj.get("attendanceCount"),
                            maxAttendance: obj.get("maxAttendance"),
                            image: obj.get("image"),
                            parseObject: obj
                        };
                    });
                });
            },
            error: function(error) {

            }
        });

        $scope.goToPartyEdit = function() {
            $state.go('app.partyEdit');
        };

        $scope.setNavTitle = function(title) {
            $ionicNavBarDelegate.title(title);
        };

        if (!$rootScope.isLoggedIn) {
            $state.go('welcome');
        }

    })

    .controller('PartyEditController', function($scope, $state, $rootScope) {

        $scope.myGoBack = function() {
           $ionicHistory.goBack();
        };

        $scope.myParty = {
            title: 'My Party',
            date: new Date(),
            location: '123 St N',
            description: 'My party\'s description.',
            startTime: new Date(),
            endTime: new Date(),
            picture: 'http://static.giantbomb.com/uploads/original/2/27545/1025596-star_carnival.jpg',
            friendsCount: '0',
            attendanceCount: '0',
            maxAttendance: '20'
        };



        $scope.party = function(title, startDate, endDate, location, description, picture, friendsCount, attendanceCount, maxAttendance) {
            this.title = title;

        };


    })

    .controller('NewPartyController', function($scope, $state, $ionicLoading, $rootScope, $ionicPopup, $ionicHistory) {

        $scope.newParty = {
            user: null,
            title: null,
            date: null,
            location: null,
            description: null,
            attendanceCount: 0,
            maxAttendance: null,
            image: null
        };

        $scope.error = {};

        $scope.addParty = function() {

            $scope.loading = $ionicLoading.show({
                content: 'Adding Party',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            var Party = Parse.Object.extend("Party");
            var party = new Party();

            party.save({
                user: $rootScope.user.getUsername(),
                title: $scope.newParty.title,
                date: $scope.newParty.date,
                location: $scope.newParty.location,
                description: $scope.newParty.description,
                attendanceCount: $scope.newParty.attendanceCount,
                maxAttendance: $scope.newParty.maxAttendance,
                image: $scope.newParty.image
            }, {
                success: function(party) {
                    $ionicLoading.hide();
                    $scope.showAlert();
                },
                error: function(party, error) {
                    $ionicLoading.hide();
                    $scope.error.message = "Oops! An error occurred! Try adding party again.";
                    $scope.$apply();
                }
            });


        };

        $scope.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Party added!',
                template: 'Lets look for more parties!'
            });
            alertPopup.then(function(res) {
                $state.go('app.home', {
                    clear: true
                });
            });
        };

    })

    .controller('SettingsController', function($scope, $state, $rootScope) {

        $scope.mySettings = {
            /*Local variables for user settings will go here*/
            searchDistance: 10,
            maxCost: 5,
            shareAttendance: true
        };

    })

    .controller('LoginController', function($scope, $state, $rootScope, $ionicLoading, $ionicHistory) {
        $scope.user = {
            username: null,
            password: null
        };

        $scope.myGoBack = function() {
            $state.go('welcome');
        };

        //CAN USE $IONICHISTORY TO GO BACK AS WELL

        /*$scope.myGoBack = function() {
         $ionicHistory.goBack();
         };*/

        $scope.error = {};

        //$rootScope.toggledrag = false;   //Set this in all the controllers you want to have enabled/disabled drag

        $scope.login = function() {
            $scope.loading = $ionicLoading.show({
                content: 'Logging in',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            var user = $scope.user;
            Parse.User.logIn(('' + user.username).toLowerCase(), user.password, {
                success: function(user) {
                    $ionicLoading.hide();
                    $rootScope.user = user;
                    $rootScope.isLoggedIn = true;
                    $state.go('app.home', {
                        clear: true
                    });
                },
                error: function(user, err) {
                    $ionicLoading.hide();
                    // The login failed. Check error to see why.
                    if (err.code === 101) {
                        $scope.error.message = 'Invalid login credentials';
                    } else {
                        $scope.error.message = 'An unexpected error has ' +
                        'occurred, please try again.';
                    }
                    $scope.$apply();
                }
            });
        };

        $scope.forgot = function() {
            $state.go('forgot');
        };

        $scope.register = function() {
            $state.go('register');
        };
    })

    .controller('ForgotPasswordController', function($scope, $state, $ionicLoading) {
        $scope.user = {};
        $scope.error = {};
        $scope.state = {
            success: false
        };

        $scope.reset = function() {
            $scope.loading = $ionicLoading.show({
                content: 'Sending',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            Parse.User.requestPasswordReset($scope.user.email, {
                success: function() {
                    // TODO: show success
                    $ionicLoading.hide();
                    $scope.state.success = true;
                    $scope.$apply();
                },
                error: function(err) {
                    $ionicLoading.hide();
                    if (err.code === 125) {
                        $scope.error.message = 'Email address does not exist';
                    } else {
                        $scope.error.message = 'An unknown error has occurred, ' +
                        'please try again';
                    }
                    $scope.$apply();
                }
            });
        };

        $scope.login = function() {
            $state.go('login');
        };

        $scope.myGoBack = function() {
            $state.go('login');
        };
    })

    .controller('RegisterController', function($scope, $state, $ionicLoading, $rootScope, $ionicHistory) {
        $scope.user = {};
        $scope.error = {};

        $scope.myGoBack = function() {
            $ionicHistory.goBack();
        };

        $scope.register = function() {

            // TODO: add age verification step

            $scope.loading = $ionicLoading.show({
                content: 'Sending',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            var user = new Parse.User();
            user.set("username", $scope.user.email);
            user.set("password", $scope.user.password);
            user.set("email", $scope.user.email);
            user.set("dob", $scope.user.dob);

            user.signUp(null, {
                success: function(user) {
                    $ionicLoading.hide();
                    $rootScope.user = user;
                    $rootScope.isLoggedIn = true;
                    $state.go('app.home', {
                        clear: true
                    });
                },
                error: function(user, error) {
                    $ionicLoading.hide();
                    if (error.code === 125) {
                        $scope.error.message = 'Please specify a valid email ' +
                        'address';
                    } else if (error.code === 202) {
                        $scope.error.message = 'The email address is already ' +
                        'registered';
                    } else {
                        $scope.error.message = error.message;
                    }
                    $scope.$apply();
                }
            });
        };
    })

    .controller('MainController', function($scope, $state, $rootScope, $stateParams, $ionicHistory) {
        if ($stateParams.clear) {
            $ionicHistory.clearHistory();
        }

        $scope.rightButtons = [{
            type: 'button-positive',
            content: '<i class="icon ion-navicon"></i>',
            tap: function(e) {
                $scope.sideMenuController.toggleRight();
            }
        }];

        $scope.logout = function() {
            Parse.User.logOut();
            $rootScope.user = null;
            $rootScope.isLoggedIn = false;
            $state.go('welcome', {
                clear: true
            });
        };

        $scope.toggleMenu = function() {
            $scope.sideMenuController.rRight();
        };
    });
