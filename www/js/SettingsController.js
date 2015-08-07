angular.module('Turnup.controllers')

    .controller('SettingsController', function($scope, $state, $rootScope) {

        $scope.mySettings = {
            /*Local variables for user settings will go here*/
            searchDistance: 10,
            maxCost: 5,
            shareAttendance: true
        };

    });
