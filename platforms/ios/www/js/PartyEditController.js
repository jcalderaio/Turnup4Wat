angular.module('Turnup.controllers', [])

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


    });
