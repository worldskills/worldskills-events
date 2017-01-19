(function() {
    'use strict';

    angular.module('eventsApp').controller('SponsorCreateCtrl', function($scope, $stateParams, Event, Sponsor, $http, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_IMAGES, $translate, $state, WorldSkills, $upload, $q) {
        var logo = $q.when();
        if ($stateParams.skillId) {
            $scope.skillId = $stateParams.skillId;
        }
        $scope.sponsor = new Sponsor();
        $scope.sponsor.event = Event.get({id: $stateParams.eventId});
        $scope.onFileSelect = function($files) {
            var deferred = $q.defer();
            logo = deferred.promise;
            $scope.upload = $upload.upload({
                url: WORLDSKILLS_API_IMAGES,
                file: $files[0],
            }).success(function(data, status, headers, config) {
                deferred.resolve(data);
            });
        };
        $scope.save = function() {
            $scope.submitted = true;
            logo.then(function (logo) {
                if ($scope.form.$invalid) {
                    angular.element($scope.form).find('.ng-invalid' ).focus();
                    return;
                }
                $scope.loading = true;
                if (typeof logo != 'undefined') {
                    $scope.sponsor.logo = {id: logo.id, thumbnail_hash: logo.thumbnail_hash};
                }
                $scope.sponsor.$save(function () {
                    if ($scope.skillId) {
                        $state.go('events.skill.sponsors', {eventId: $scope.sponsor.event.id, id: $scope.skillId});
                    } else {
                        $state.go('events.event.sponsors', {id: $scope.sponsor.event.id});
                    }
                });
            });
        };
    });

    angular.module('eventsApp').controller('SponsorCtrl', function($scope, $stateParams, Sponsor, auth, $http, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_IMAGES, EVENTS_APP_CODE, $translate, $state, WorldSkills, $upload, $q) {
        var logo = $q.when();
        $scope.id = $stateParams.id;
        if ($stateParams.skillId) {
            $scope.skillId = $stateParams.skillId;
        }
        $scope.sponsor = Sponsor.get({id: $scope.id}, function (sponsor) {
            $scope.title = sponsor.name;
            if (sponsor.logo != null) {
                $scope.logoImage = sponsor.logo.thumbnail + '_small';
            }
            auth.hasUserRole(EVENTS_APP_CODE, ['Admin', 'DeleteEvents'], $scope.sponsor.event.ws_entity.id).then(function (hasUserRole) {
                $scope.canDelete = hasUserRole;
            });
        });
        $scope.removeLogo = false;
        $scope.onFileSelect = function($files) {
            var deferred = $q.defer();
            logo = deferred.promise;
            $scope.upload = $upload.upload({
                url: WORLDSKILLS_API_IMAGES,
                file: $files[0],
            }).success(function(data, status, headers, config) {
                deferred.resolve(data);
            });
        };
        $scope.save = function() {
            $scope.submitted = true;
            logo.then(function (logo) {
                if ($scope.form.$invalid) {
                    angular.element($scope.form).find('.ng-invalid' ).focus();
                    return;
                }
                $scope.loading = true;
                if (typeof logo != 'undefined') {
                    $scope.sponsor.logo = {id: logo.id, thumbnail_hash: logo.thumbnail_hash};
                } else if ($scope.removeLogo) {
                    delete $scope.sponsor.logo;
                }
                $scope.sponsor.$update(function () {
                    if ($scope.skillId) {
                        $state.go('events.skill.sponsors', {eventId: $scope.sponsor.event.id, id: $scope.skillId});
                    } else {
                        $state.go('events.event.sponsors', {id: $scope.sponsor.event.id});
                    }
                });
            });
        };
        $scope.deleteSponsor = function() {
            $scope.deleteLoading = true;
            $scope.sponsor.$delete(function () {
                alert('The Sponsor has been deleted successfully.');
                if ($scope.skillId) {
                    $state.go('events.skill.sponsors', {eventId: $scope.sponsor.event.id, id: $scope.skillId});
                } else {
                    $state.go('events.event.sponsors', {id: $scope.sponsor.event.id});
                }
            });
        };
    });

})();
