angular.module('Turnup.controllers', [])

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
                user: $rootScope.user.get('objectId'),
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
                title: 'Tournament added!',
                template: 'Lets look for more tournaments!'
            });
            alertPopup.then(function(res) {
                $state.go('app.home', {
                    clear: true
                });
            });
        };

    });
