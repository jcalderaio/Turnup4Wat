angular.module('Turnup.controllers', [])

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
