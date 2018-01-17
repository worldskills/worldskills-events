(function() {
    'use strict';

    angular.module('eventsApp').controller('SectorCreateCtrl', function($scope, $stateParams, Sector, BaseSector, Event, $state, alert) {
        $scope.sector = new Sector();
        $scope.sector.name = {text: '', lang_code: 'en'};
        $scope.sector.event = Event.get({id: $stateParams.eventId});
        $scope.baseSectors = BaseSector.query();
        $scope.save = function() {
            $scope.submitted = true;
            if ($scope.form.$valid) {
                $scope.loading = true;
                $scope.sector.$save(function () {
                    alert.success('The Sector has been added successfully.');
                    $state.go('events.event.sectors', {id: $scope.sector.event.id});
                });
            }
        };
    });

    angular.module('eventsApp').controller('SectorCtrl', function($scope, $stateParams, Sector, BaseSector, auth, $state, alert) {
        $scope.eventId = $stateParams.eventId;
        $scope.id = $stateParams.id;
        $scope.sector = Sector.get({eventId: $scope.eventId, id: $scope.id}, function (sector) {
            $scope.title = sector.name.text;
            auth.hasUserRole(EVENTS_APP_CODE, ['Admin', 'DeleteEvents'], $scope.sector.event.ws_entity.id).then(function (hasUserRole) {
                $scope.canDelete = hasUserRole;
            });
        });
        $scope.baseSectors = BaseSector.query();
        $scope.deleteSector = function() {
            if (alert.confirm('Are you sure you want to delete this Sector? Click OK to proceed.')) {
                $scope.deleteLoading = true;
                $scope.sector.$delete(function () {
                    alert.success('The Sector has been deleted successfully.');
                    $state.go('events.event.sectors', {id: $scope.sector.event.id});
                }, function (response) {
                    $scope.deleteLoading = false;
                    alert.error('Error deleting Sector. ' + response.data.code + ': ' + response.data.user_msg);
                });
            }
        };
        $scope.save = function() {
            $scope.submitted = true;
            if ($scope.form.$valid) {
                $scope.loading = true;
                $scope.sector.$update(function () {
                    alert.success('The Sector has been updated successfully.');
                    $state.go('events.event.sectors', {id: $scope.sector.event.id});
                });
            }
        };
    });
})();
