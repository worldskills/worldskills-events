(function() {
    'use strict';

    angular.module('eventsApp').controller('SponsorCreateCtrl', function($scope, $stateParams, Event, Sponsor, $http, API_EVENTS, $translate, $state, WorldSkills) {
        $scope.sponsor = new Sponsor();
        $scope.sponsor.logo = '';
        $scope.sponsor.event = Event.get({id: $stateParams.eventId});
        $scope.save = function() {
            $scope.submitted = true;
            if ($scope.form.$invalid) {
                angular.element($scope.form).find('.ng-invalid' ).focus();
                return;
            }
            $scope.loading = true;
            $scope.sponsor.$save(function () {
                $state.go('event.sponsors', {id: $scope.sponsor.event.id});
            });
        };
    });

    angular.module('eventsApp').controller('SponsorCtrl', function($scope, $stateParams, Sponsor, $http, API_EVENTS, $translate, $state) {
        $scope.id = $stateParams.id;
        $scope.sponsor = Sponsor.get({id: $scope.id}, function (event) {
            $scope.title = event.name;
        });
        $scope.save = function() {
            $scope.submitted = true;
            if ($scope.form.$invalid) {
                angular.element($scope.form).find('.ng-invalid' ).focus();
                return;
            }
            $scope.loading = true;
            $scope.sponsor.$update(function () {
                $state.go('event.sponsors', {id: $scope.sponsor.event.id});
            });
        };
        $scope.deleteSponsor = function() {
            $scope.deleteLoading = true;
            $scope.sponsor.$delete(function () {
                alert('The Sponsor has been deleted successfully.');
                $state.go('event.sponsors', {id: $scope.sponsor.event.id});
            });
        };
    });

})();
