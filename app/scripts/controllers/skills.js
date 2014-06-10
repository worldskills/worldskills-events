(function() {
    'use strict';

    angular.module('eventsApp').controller('SkillCreateCtrl', function($scope, $stateParams, Skill, Event, $http, API_EVENTS, $translate, $state, WorldSkills, alert) {
        $scope.skill = new Skill();
        $scope.skill.name = {text: '', lang_code: 'en'};
        $scope.skill.description = {text: '', lang_code: 'en'};
        $scope.skill.event = Event.get({id: $stateParams.eventId});
    });

    angular.module('eventsApp').controller('SkillCtrl', function($scope, $stateParams, Skill, $http, API_EVENTS, $translate, $state, WorldSkills, alert) {
        $scope.id = $stateParams.id;
        $scope.skill = Skill.get({id: $scope.id}, function (skill) {
            $scope.title = skill.name.text;
            var url = WorldSkills.getLink(skill.event.links, 'sectors');
            $http({method: 'GET', url: url}).success(function(data, status, headers, config) {
                $scope.sectors = data.sectors;
            });
        });
        $scope.deleteSkill = function() {
            $scope.deleteLoading = true;
            $scope.skill.$delete(function () {
                alert.success('The Skill has been deleted successfully.');
                $state.go('event.skills', {id: $scope.skill.event.id});
            });
        };
    });
    angular.module('eventsApp').controller('SkillFormCtrl', function($scope, $stateParams, Skill, $http, API_EVENTS, $translate, $state, WorldSkills, alert) {
        $scope.save = function() {
            $scope.submitted = true;
            if ($scope.form.$valid) {
                $scope.loading = true;
                if ($scope.skill.id) {
                    $scope.skill.$update(function () {
                        alert.success('The Skill has been updated successfully.');
                        $state.go('event.skills', {id: $scope.skill.event.id});
                    });
                } else {
                    $scope.skill.$save(function () {
                        alert.success('The Skill has been added successfully.');
                        $state.go('event.skills', {id: $scope.skill.event.id});
                    });
                }
            }
        };
    });
    angular.module('eventsApp').controller('SkillPhotosCtrl', function($scope, $stateParams, Skill, SkillPhoto, $http, API_EVENTS, API_IMAGES, $q, $upload, $state, WorldSkills, alert) {
        var photo = $q.when();
        $scope.thumbnail = function (photo) {
            return WorldSkills.getLink(photo.links, 'alternate');
        };
        $scope.onFileSelect = function($files) {
            var deferred = $q.defer();
            photo = deferred.promise;
            $scope.upload = $upload.upload({
                url: API_IMAGES,
                data: {entity: $scope.skill.event.entity.id},
                file: $files[0],
            }).success(function(data, status, headers, config) {
                deferred.resolve(data);
            });
        };
        $scope.removePhotos = function() {
            var notRemoved = [];
            angular.forEach($scope.skill.photos, function (photo) {
                if (photo.checked) {
                    SkillPhoto.remove({id: $scope.skill.id, photo: photo.id});
                } else {
                    notRemoved.push(photo);
                }
            });
            $scope.skill.photos = notRemoved;
            alert.success('The selected photos have been removed.', true);
        };
        $scope.addPhoto = function() {
            $scope.submitted = true;
            photo.then(function (photo) {
                if ($scope.form.$invalid) {
                    angular.element($scope.form).find('.ng-invalid' ).focus();
                    return;
                }
                SkillPhoto.update({id: $scope.skill.id, photo: photo.id}, {thumbnail_hash: photo.thumbnail_hash}, function () {
                    $state.go('skill.photos', {id: $scope.skill.id}, {reload: true});
                });
            });
        };
    });
})();
