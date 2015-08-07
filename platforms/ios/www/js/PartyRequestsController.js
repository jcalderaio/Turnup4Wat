angular.module('Turnup.controllers', [])

    .controller('PartyRequestsController', function($scope, $state, $rootScope) {

        $scope.showReviewsButton = true;

        $scope.calculateAge = function(birthday) {
            var today = new Date();
            var age = today.getFullYear() - birthday.getFullYear();
            var monthDifference = today.getMonth() - birthday.getMonth();
            if(monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthday.getDate())) --age;
            return age;
        };

        $scope.switchShownButton = function() {
            //$scope.showReviewsButton = !$scope.showReviewsButton;
        };

    });
