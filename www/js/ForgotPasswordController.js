angular.module('Turnup.controllers')

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
    });
