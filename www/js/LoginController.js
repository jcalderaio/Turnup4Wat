angular.module('Turnup.controllers')

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
    });
