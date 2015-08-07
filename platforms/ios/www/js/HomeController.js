angular.module('Turnup.controllers', [])

    .controller('HomeController', function($scope, $state, $rootScope, $ionicNavBarDelegate) {

        $scope.calculatePartyTimeAsString = function(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        };

        $scope.showPartyFullAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Party is full!',
                template: 'Sorry!'
            });
            alertPopup.then(function(res){});
        };

        $scope.showPartyRequestError = function(errorMessage) {
            var alertPopup = $ionicPopup.alert({
                title: 'Something went wrong!',
                template: errorMessage
            });
            alertPopup.then(function(res){});
        };

        $scope.showPartyRequestSuccess = function() {
            var alertPopup = $ionicPopup.alert({
                title: "Request sent!",
                template: "Check Party Requests for status updates"
            })
        };

        $scope.sendPartyRequest = function(attendee, party) {
            if(party.attendanceCount >= party.maxAttendance) $scope.showPartyFullAlert();
            else {
                var User = Parse.Object.extend("User");
                var hostQuery = new Parse.Query(User);
                hostQuery.get(party.get('user'), {      //using the objectId associated with the party (user) to get the user object from Parse
                    success: function(partyHost) {
                        partyHost.addUnique("partyRequests", attendee.get('objectId'));
                    },
                    error: function(object, error) {
                        // The object was not retrieved successfully.
                        // error is a Parse.Error with an error code and message.
                        $scope.showPartyRequestError(error.message);
                    }
                });
            }
        };

        $scope.parties = [];

        //Automatically call this on first load

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

        //Pull this on subsequent loads

        $scope.doRefresh = function() {

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

            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply();
        };



        $scope.goToPartyEdit = function() {
            $state.go('app.partyEdit');
        };

        $scope.setNavTitle = function(title) {
            $ionicNavBarDelegate.title(title);
        };

        if (!$rootScope.isLoggedIn) {
            $state.go('welcome');
        }

    });
