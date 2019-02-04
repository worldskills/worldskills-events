(function() {
    'use strict';

    angular.module('eventsApp').controller('SectorCreateCtrl', function($scope, $stateParams, Sector, BaseSector, Event, $state, alert) {
        $scope.sector = new Sector();
        $scope.sector.name = {text: '', lang_code: 'en'};
        $scope.sector.event = Event.get({id: $stateParams.eventId});
        $scope.baseSectors = BaseSector.query();
    });

    angular.module('eventsApp').controller('SectorCtrl', function($scope, $stateParams, $http, Sector, BaseSector, EVENTS_APP_CODE, auth, $state, alert) {
        $scope.eventId = $stateParams.eventId;
        $scope.id = $stateParams.id;
        $scope.sector = Sector.get({eventId: $scope.eventId, id: $scope.id}, function (sector) {
            $scope.title = sector.name.text;
            auth.hasUserRole(EVENTS_APP_CODE, ['Admin', 'DeleteEvents'], $scope.sector.event.ws_entity.id).then(function (hasUserRole) {
                $scope.canDelete = hasUserRole;
            });
            auth.hasUserRole(EVENTS_APP_CODE, ['Admin', 'EditEvents'], $scope.sector.event.ws_entity.id).then(function (hasUserRole) {
                $scope.canEdit = hasUserRole;
            });
            auth.hasUserRole(EVENTS_APP_CODE, ['Admin', 'OrganizerEditEvents'], $scope.sector.event.ws_entity.id).then(function (hasUserRole) {
                $scope.canOrganizerEdit = hasUserRole;
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
    });

    angular.module('eventsApp').controller('SectorFormCtrl', function($scope, $stateParams, $http, Sector, BaseSector, EVENTS_APP_CODE, auth, $state, alert) {
        $scope.save = function() {
            $scope.submitted = true;
            if ($scope.form.$valid) {
                $scope.loading = true;
                if ($scope.sector.id) {
                    $scope.sector.$update(function () {
                        alert.success('The Sector has been updated successfully.');
                        $state.go('events.event.sectors', {id: $scope.sector.event.id});
                    });
                } else {
                    $scope.sector.$save(function () {
                        alert.success('The Sector has been added successfully.');
                        $state.go('events.event.sectors', {id: $scope.sector.event.id});
                    });
                }
            }
        };
    });

    angular.module('eventsApp').controller('SectorTranslationsCtrl', function($scope, $stateParams, $http, $q, Sector, BaseSector, EVENTS_APP_CODE, auth, $state, alert) {

        $scope.translations = [];
        $scope.sector.$promise.then(function () {
            angular.forEach($scope.sector.links, function (link) {
                if (link.rel == 'i18n') {
                    $http({method: 'GET', url: link.href}).success(function(data, status, headers, config) {
                        $scope.translations.push(new Sector(data));
                    });
                }
            });
        });

        $scope.addTranslation = function (lang) {
            var translation = angular.copy($scope.sector);
            translation.name.text = '';
            translation.name.lang_code = lang;
            $scope.translations.push(translation);
        };

        $scope.save = function() {
            $scope.submitted = true;
            if ($scope.form.$valid) {
                $scope.loading = true;
                var promises = [];
                angular.forEach($scope.translations, function (translation) {
                    promises.push(translation.$update());
                });
                $q.all(promises).then(function() {
                    alert.success('The Sector Translations have been updated successfully.');
                    $state.go('events.event.sectors', {id: $scope.sector.event.id});
                });
            }
        };
    });
})();
