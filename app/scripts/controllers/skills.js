(function() {
    'use strict';

    angular.module('eventsApp').controller('SkillCreateCtrl', function($scope, $stateParams, Skill, Event, $http, WORLDSKILLS_API_EVENTS, $translate, $state, WorldSkills, alert) {
        $scope.skill = new Skill();
        $scope.skill.name = {text: '', lang_code: 'en'};
        $scope.skill.description = {text: '', lang_code: 'en'};
        $scope.skill.description_industry_action = {text: '', lang_code: 'en'};
        $scope.skill.description_required_skills = {text: '', lang_code: 'en'};
        $scope.skill.description_competition_action = {text: '', lang_code: 'en'};
        $scope.skill.event = Event.get({id: $stateParams.eventId});
    });

    angular.module('eventsApp').controller('SkillCtrl', function($scope, $stateParams, Skill, auth, $http, $q, WORLDSKILLS_API_EVENTS, EVENTS_APP_CODE, $translate, $state, WorldSkills, alert) {
        $scope.eventId = $stateParams.eventId;
        $scope.id = $stateParams.id;
        $scope.translations = [];
        $scope.translationsLoading = true;
        $scope.skill = Skill.get({eventId: $scope.eventId, id: $scope.id}, function (skill) {
            $scope.title = skill.name.text;
            if (!$scope.skill.description) {
                $scope.skill.description = {text: '', lang_code: 'en'};
            }
            if (!$scope.skill.description_industry_action) {
                $scope.skill.description_industry_action = {text: '', lang_code: 'en'};
            }
            if (!$scope.skill.description_required_skills) {
                $scope.skill.description_required_skills = {text: '', lang_code: 'en'};
            }
            if (!$scope.skill.description_competition_action) {
                $scope.skill.description_competition_action = {text: '', lang_code: 'en'};
            }
            var url = WorldSkills.getLink(skill.event.links, 'sectors');
            $http({method: 'GET', url: url}).success(function(data, status, headers, config) {
                $scope.sectors = data.sectors;
            });
            var translationPromises = [];
            angular.forEach($scope.skill.links, function (link) {
                if (link.rel == 'i18n') {
                    translationPromises.push($http({method: 'GET', url: link.href}).success(function(data, status, headers, config) {
                        $scope.translations.push(new Skill(data));
                    }));
                }
            });
            $q.all(translationPromises).then(function() {
                $scope.translationsLoading = false;
            });
            auth.hasUserRole(EVENTS_APP_CODE, ['Admin', 'DeleteEvents'], $scope.skill.event.ws_entity.id).then(function (hasUserRole) {
                $scope.canDelete = hasUserRole;
            });
        });
        $scope.setStatusRemoved = function() {
           if (alert.confirm('Setting the status of the Skill to Removed will hide it from all Skill lists. The data associated with it will not be deleted. Click OK to proceed.')) {
               $scope.setStatusRemovedLoading = true;
               Skill.get({eventId: $scope.eventId, id: $scope.id}, function (skill) {
                  skill.status = 'removed';
                  skill.$update(function () {
                       alert.success('The status of the Skill has been successfully set to Removed.');
                       $state.go('events.event.skills', {id: $scope.skill.event.id});
                   });
               });
           }
        };
        $scope.deleteSkill = function() {
           if (alert.confirm('Deleting the Skill will also delete all data associated with this Skill. Click OK to proceed.')) {
               $scope.deleteLoading = true;
               $scope.skill.$delete(function () {
                   alert.success('The Skill has been deleted successfully.');
                   $state.go('events.event.skills', {id: $scope.skill.event.id});
               });
           }
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
    angular.module('eventsApp').controller('SkillCloneCtrl', function($scope, $stateParams, Skill, SkillClone, Event, $http, WORLDSKILLS_API_EVENTS, $translate, $state, WorldSkills, alert) {
        Event.query({limit: 300, type: 'competition'}, function (data) {
            $scope.events = data;
        });
        $scope.clonedSkill = {
           event: null
        };
        $scope.clone = function() {
            $scope.submitted = true;
            if ($scope.form.$valid) {
                $scope.loading = true;
                SkillClone.clone({eventId: $scope.skill.event.id, id: $scope.skill.id}, $scope.clonedSkill, function (skill) {
                    alert.success('The Skill has been copied successfully. Please edit the copy of the Skill below.');
                    $state.go('events.skill.form', {eventId: skill.event.id, id: skill.id});
                });
            }
        };
    });
    angular.module('eventsApp').controller('SkillPhotosCtrl', function($scope, $stateParams, Skill, SkillPhoto, $http, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_IMAGES, $q, $upload, $state, WorldSkills, alert) {
        var photo = $q.when();
        $scope.thumbnail = function (photo) {
            return photo.thumbnail + '_small';
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
                    SkillPhoto.remove({eventId: $scope.skill.event.id, id: $scope.skill.id, photo: photo.id});
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
                SkillPhoto.update({eventId: $scope.skill.event.id, id: $scope.skill.id, photo: photo.id}, {thumbnail_hash: photo.thumbnail_hash}, function () {
                    $state.go('events.skill.photos', {eventId: $scope.skill.event.id, id: $scope.skill.id}, {reload: true});
                });
            });
        };
    });
    angular.module('eventsApp').controller('SkillTranslationsCtrl', function($scope, $stateParams, Skill, SkillPhoto, $http, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_IMAGES, $q, $upload, $state, WorldSkills, alert) {

    });
    angular.module('eventsApp').controller('TranslationCtrl', function($scope, $stateParams, Skill, SkillTranslation, $http, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_IMAGES, $q, $upload, $translate, $state, WorldSkills, alert) {
        $scope.eventId = $stateParams.eventId;
        $scope.skillId = $stateParams.skillId;
        $scope.locale = $stateParams.locale;
        $scope.skill = Skill.get({eventId: $scope.eventId, id: $scope.skillId}, function (skill) {
            $translate($scope.locale).then(function (language) {
                $scope.title = language + ' Tanslation ' + skill.name.text;
           });
        });
        $scope.translation = Skill.get({eventId: $scope.eventId, id: $scope.skillId, l: $scope.locale}, function (translation) {
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
            SkillTranslation.remove({eventId: $scope.skill.event.id, id: $scope.skill.id, locale: $scope.locale}, function () {
                alert.success('The translation has been deleted successfully.');
                $state.go('events.skill.translations', {eventId: $scope.eventId, id: $scope.skill.id});
            });
        };
    });
    angular.module('eventsApp').controller('TranslationCreateCtrl', function($scope, $stateParams, Skill, $http, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_IMAGES, $q, $upload, $state, WorldSkills, alert) {
        $scope.eventId = $stateParams.eventId;
        $scope.skillId = $stateParams.skillId;
        $scope.translation = new Skill();
        $scope.skill = Skill.get({eventId: $scope.eventId, id: $scope.skillId}, function (skill) {
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
                var langCode = $scope.translation.name.lang_code;
                $scope.translation.description.lang_code = langCode;
                $scope.translation.description_industry_action.lang_code = langCode;
                $scope.translation.description_required_skills.lang_code = langCode;
                $scope.translation.description_competition_action.lang_code = langCode;
                $scope.translation.$update({l: langCode}, function () {
                    alert.success('The translation has been updated successfully.');
                    $state.go('events.skill.translations', {eventId: $scope.skill.event.id, id: $scope.skill.id});
                });
            }
        };
    });
})();
