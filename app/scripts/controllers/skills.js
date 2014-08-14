(function() {
    'use strict';

    angular.module('eventsApp').controller('SkillCreateCtrl', function($scope, $stateParams, Skill, Event, $http, WORLDSKILLS_API_EVENTS, $translate, $state, WorldSkills, alert) {
        $scope.skill = new Skill();
        $scope.skill.name = {text: '', lang_code: 'en'};
        $scope.skill.description = {text: '', lang_code: 'en'};
        $scope.skill.event = Event.get({id: $stateParams.eventId});
    });

    angular.module('eventsApp').controller('SkillCtrl', function($scope, $stateParams, Skill, $http, WORLDSKILLS_API_EVENTS, $translate, $state, WorldSkills, alert) {
        $scope.id = $stateParams.id;
        $scope.translations = [];
        $scope.skill = Skill.get({id: $scope.id}, function (skill) {
            $scope.title = skill.name.text;
            var url = WorldSkills.getLink(skill.event.links, 'sectors');
            $http({method: 'GET', url: url}).success(function(data, status, headers, config) {
                $scope.sectors = data.sectors;
            });
            angular.forEach($scope.skill.links, function (link) {
                if (link.rel == 'i18n') {
                    $http({method: 'GET', url: link.href}).success(function(data, status, headers, config) {
                        $scope.translations.push(new Skill(data));
                    });
                }
            });
        });
        $scope.deleteSkill = function() {
            $scope.deleteLoading = true;
            $scope.skill.$delete(function () {
                alert.success('The Skill has been deleted successfully.');
                $state.go('events.event.skills', {id: $scope.skill.event.id});
            });
        };
    });
    angular.module('eventsApp').controller('SkillFormCtrl', function($scope, $stateParams, Skill, $http, WORLDSKILLS_API_EVENTS, $translate, $state, WorldSkills, alert) {
        $scope.save = function() {
            $scope.submitted = true;
            if ($scope.form.$valid) {
                $scope.loading = true;
                if ($scope.skill.id) {
                    $scope.skill.$update(function () {
                        alert.success('The Skill has been updated successfully.');
                        $state.go('events.event.skills', {id: $scope.skill.event.id});
                    });
                } else {
                    $scope.skill.$save(function () {
                        alert.success('The Skill has been added successfully.');
                        $state.go('events.event.skills', {id: $scope.skill.event.id});
                    });
                }
            }
        };
    });
    angular.module('eventsApp').controller('SkillPhotosCtrl', function($scope, $stateParams, Skill, SkillPhoto, $http, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_IMAGES, $q, $upload, $state, WorldSkills, alert) {
        var photo = $q.when();
        $scope.thumbnail = function (photo) {
            return WorldSkills.getLink(photo.links, 'alternate');
        };
        $scope.onFileSelect = function($files) {
            var deferred = $q.defer();
            photo = deferred.promise;
            $scope.upload = $upload.upload({
                url: WORLDSKILLS_API_IMAGES,
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
                    $state.go('events.skill.photos', {id: $scope.skill.id}, {reload: true});
                });
            });
        };
    });
    angular.module('eventsApp').controller('SkillTranslationsCtrl', function($scope, $stateParams, Skill, SkillPhoto, $http, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_IMAGES, $q, $upload, $state, WorldSkills, alert) {
        
    });
    angular.module('eventsApp').controller('TranslationCtrl', function($scope, $stateParams, Skill, SkillTranslation, $http, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_IMAGES, $q, $upload, $translate, $state, WorldSkills, alert) {
        $scope.skillId = $stateParams.skillId;
        $scope.locale = $stateParams.locale;
        $scope.skill = Skill.get({id: $scope.skillId}, function (skill) {
            $translate($scope.locale).then(function (language) {
                $scope.title = language + ' Tanslation ' + skill.name.text;
           });
        });
        Skill.get({id: $scope.skillId, l: $scope.locale}, function (translation) {
            $scope.translation = translation;
            if (!$scope.translation.description) {
                $scope.translation.description = {text: '', lang_code: ''};
            }
            if (!$scope.translation.description_industry_action) {
                $scope.translation.description_industry_action = {text: '', lang_code: ''};
            }
            if (!$scope.translation.description_required_skills) {
                $scope.translation.description_required_skills = {text: '', lang_code: ''};
            }
            if (!$scope.translation.description_competition_action) {
                $scope.translation.description_competition_action = {text: '', lang_code: ''};
            }
        });
        $scope.deleteTranslation = function() {
            $scope.deleteLoading = true;
            SkillTranslation.remove({id: $scope.skill.id, locale: $scope.locale}, function () {
                alert.success('The translation has been deleted successfully.');
                $state.go('events.skill.translations', {id: $scope.skill.id});
            });
        };
    });
    angular.module('eventsApp').controller('TranslationCreateCtrl', function($scope, $stateParams, Skill, $http, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_IMAGES, $q, $upload, $state, WorldSkills, alert) {
        $scope.skillId = $stateParams.skillId;
        $scope.skill = Skill.get({id: $scope.skillId}, function (skill) {
            $scope.translation = angular.copy(skill);
            $scope.translation.name.lang_code = '';
            $scope.translation.name.text = '';
            if (!$scope.translation.description) {
                $scope.translation.description = {text: '', lang_code: ''};
            }
            if (!$scope.translation.description_industry_action) {
                $scope.translation.description_industry_action = {text: '', lang_code: ''};
            }
            if (!$scope.translation.description_required_skills) {
                $scope.translation.description_required_skills = {text: '', lang_code: ''};
            }
            if (!$scope.translation.description_competition_action) {
                $scope.translation.description_competition_action = {text: '', lang_code: ''};
            }
            $scope.translation.description.text = '';
            $scope.translation.description_industry_action.text = '';
            $scope.translation.description_required_skills.text = '';
            $scope.translation.description_competition_action.text = '';
        });
    });
    angular.module('eventsApp').controller('TranslationFormCtrl', function($scope, $stateParams, Skill, $http, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_IMAGES, $q, $upload, $state, WorldSkills, alert) {
        $scope.save = function() {
            $scope.submitted = true;
            if ($scope.form.$valid) {
                $scope.loading = true;
                $scope.translation.description.lang_code = $scope.translation.name.lang_code;
                $scope.translation.description_industry_action.lang_code = $scope.translation.name.lang_code;
                $scope.translation.description_required_skills.lang_code = $scope.translation.name.lang_code;
                $scope.translation.description_competition_action.lang_code = $scope.translation.name.lang_code;
                $scope.translation.$update(function () {
                    alert.success('The translation has been updated successfully.');
                    $state.go('events.skill.translations', {id: $scope.skill.id});
                });
            }
        };
    });
})();
