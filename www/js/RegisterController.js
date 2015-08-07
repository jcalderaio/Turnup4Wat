angular.module('Turnup.controllers')

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
            user.set("name", $scope.user.name);
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
    });
