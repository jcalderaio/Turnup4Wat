angular.module('Turnup.controllers')

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
    });
