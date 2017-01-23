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
            auth.hasUserRole(EVENTS_APP_CODE, ['Admin', 'EditEvents'], $scope.skill.event.ws_entity.id).then(function (hasUserRole) {
                $scope.canEdit = hasUserRole;
            });
            if ($scope.skill.event.organizer) {
                auth.hasUserRole(EVENTS_APP_CODE, ['Admin', 'OrganizerEditEvents'], $scope.skill.event.organizer.id).then(function (hasUserRole) {
                    $scope.canOrganizerEdit = hasUserRole;
                });
            }
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
    angular.module('eventsApp').controller('SkillTagsCtrl', function($scope, $stateParams, EventSkillTag, SkillTag, Event, $http, WORLDSKILLS_API_EVENTS, $translate, $state, WorldSkills, alert) {
        var getTags = function () {
            $scope.tags = EventSkillTag.query({eventId: $stateParams.eventId}, function () {
                $scope.skill.$promise.then(function () {
                    angular.forEach($scope.skill.tags, function (skillTag) {
                        angular.forEach($scope.tags.tags, function (tag) {
                            if (tag.id === skillTag.id) {
                                tag.used = true;
                            }
                        });
                    });
                });
            });
        };
        getTags();
        $scope.addTag = function (tag) {
            SkillTag.update({eventId: $stateParams.eventId, skillId: $scope.skill.id, id: tag.id}, {});
            $scope.skill.tags.push(tag);
            getTags();
            alert.success('The tag has been added.', true);
            return false;
        };
        $scope.removeTags = function() {
            var notRemoved = [];
            angular.forEach($scope.skill.tags, function (tag) {
                if (tag.checked) {
                    SkillTag.remove({eventId: $stateParams.eventId, skillId: $scope.skill.id, id: tag.id}, {});
                } else {
                    notRemoved.push(tag);
                }
            });
            $scope.skill.tags = notRemoved;
            getTags();
            alert.success('The selected tags have been removed.', true);
        };
    });
    angular.module('eventsApp').controller('SkillSponsorsCtrl', function($scope, $stateParams, SkillSponsor, EventSponsor, Event, $http, WORLDSKILLS_API_EVENTS, $translate, $state, WorldSkills, alert) {
        var getSponsors = function () {
            $scope.sponsors = EventSponsor.query({eventId: $stateParams.eventId, limit: 100}, function () {
                $scope.skill.$promise.then(function () {
                    angular.forEach($scope.skill.sponsors, function (skillSponsor) {
                        angular.forEach($scope.sponsors.sponsors, function (sponsor) {
                            if (sponsor.id === skillSponsor.id) {
                                sponsor.used = true;
                            }
                        });
                    });
                });
            });
        };
        getSponsors();
        $scope.addSponsor = function (sponsor) {
            var maxSort = 1;
            $scope.skill.sponsors.forEach(function (s) {
                maxSort = Math.max(maxSort, s.sort);
            });
            SkillSponsor.update({eventId: $stateParams.eventId, skillId: $scope.skill.id, id: sponsor.id}, {sort: maxSort + 1});
            $scope.skill.sponsors.push(sponsor);
            getSponsors();
            alert.success('The sponsor has been added.', true);
            return false;
        };
        $scope.moveSponsorUp = function (sponsor) {
            var index = $scope.skill.sponsors.indexOf(sponsor);
            var prevSponsor = $scope.skill.sponsors[index - 1];
            var prevSort = prevSponsor.sort;
            $scope.skill.sponsors[index] = prevSponsor;
            $scope.skill.sponsors[index - 1] = sponsor;
            prevSponsor.sort = sponsor.sort;
            sponsor.sort = prevSort;
            SkillSponsor.update({eventId: $stateParams.eventId, skillId: $scope.skill.id}, sponsor);
            SkillSponsor.update({eventId: $stateParams.eventId, skillId: $scope.skill.id}, prevSponsor);
        };
        $scope.moveSponsorDown = function (sponsor) {
            var index = $scope.skill.sponsors.indexOf(sponsor);
            var nextSponsor = $scope.skill.sponsors[index + 1];
            var nextSort = nextSponsor.sort;
            $scope.skill.sponsors[index] = nextSponsor;
            $scope.skill.sponsors[index + 1] = sponsor;
            nextSponsor.sort = sponsor.sort;
            sponsor.sort = nextSort;
            SkillSponsor.update({eventId: $stateParams.eventId, skillId: $scope.skill.id}, sponsor);
            SkillSponsor.update({eventId: $stateParams.eventId, skillId: $scope.skill.id}, nextSponsor);
        };
        $scope.removeSponsors = function() {
            var notRemoved = [];
            angular.forEach($scope.skill.sponsors, function (sponsor) {
                if (sponsor.checked) {
                    SkillSponsor.remove({eventId: $stateParams.eventId, skillId: $scope.skill.id}, sponsor);
                } else {
                    notRemoved.push(sponsor);
                }
            });
            $scope.skill.sponsors = notRemoved;
            getSponsors();
            alert.success('The selected sponsors have been removed.', true);
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
        $scope.thumbnail = function (photo) {
            return photo.thumbnail + '_small';
        };
    });
    angular.module('eventsApp').controller('SkillPhotoCreateCtrl', function($scope, $stateParams, Skill, SkillPhoto, $http, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_IMAGES, $q, $upload, $translate, $state, WorldSkills, alert) {
        var image = $q.when();
        $scope.imageLoading = false;
        $scope.eventId = $stateParams.eventId;
        $scope.skillId = $stateParams.skillId;
        $scope.skill = Skill.get({eventId: $scope.eventId, id: $scope.skillId}, function (skill) {
        });
        $scope.photo = new SkillPhoto();
        $scope.photo.skill = $scope.skill;
        $scope.photo.description = {text: '', lang_code: 'en'};
        $scope.onFileSelect = function($files) {
            var deferred = $q.defer();
            image = deferred.promise;
            $scope.imageLoading = true;
            $scope.upload = $upload.upload({
                url: WORLDSKILLS_API_IMAGES,
                file: $files[0],
            }).success(function(data, status, headers, config) {
                deferred.resolve(data);
            });
        };
        $scope.save = function() {
            $scope.submitted = true;
            if ($scope.form.$valid && $scope.imageLoading) {
                image.then(function (image) {
                    $scope.photo.image_id = image.id;
                    $scope.photo.thumbnail_hash = image.thumbnail_hash;
                    $scope.photo.$save({eventId: $scope.skill.event.id, skillId: $scope.skill.id}, function () {
                        alert.success('The photo has been added successfully.');
                        $state.go('events.skill.photos', {eventId: $scope.skill.event.id, id: $scope.skill.id});
                    });
                });
            }
        };
    });
    angular.module('eventsApp').controller('SkillPhotoCtrl', function($scope, $stateParams, Skill, SkillPhoto, $http, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_IMAGES, $q, $upload, $translate, $state, WorldSkills, alert) {
        var image = $q.when();
        $scope.imageLoading = false;
        $scope.eventId = $stateParams.eventId;
        $scope.skillId = $stateParams.skillId;
        $scope.id = $stateParams.id;
        $scope.skill = Skill.get({eventId: $scope.eventId, id: $scope.skillId}, function (skill) {
        });
        $scope.photo = SkillPhoto.get({eventId: $scope.eventId, skillId: $scope.skillId, id: $scope.id}, function (photo) {
            if (!$scope.photo.description) {
                $scope.photo.description = {text: '', lang_code: 'en'};
            }
            if (!$scope.photo.description.lang_code) {
                $scope.photo.description.lang_code = 'en';
            }
            if (!$scope.photo.description.text) {
                $scope.photo.description.text = '';
            }
            $scope.photoThumbnail = photo.thumbnail + '_small';
        });
        $scope.onFileSelect = function($files) {
            var deferred = $q.defer();
            image = deferred.promise;
            $scope.imageLoading = true;
            $scope.upload = $upload.upload({
                url: WORLDSKILLS_API_IMAGES,
                file: $files[0],
            }).success(function(data, status, headers, config) {
                deferred.resolve(data);
            });
        };
        $scope.deletePhoto = function() {
            $scope.deleteLoading = true;
            $scope.photo.$delete({eventId: $scope.skill.event.id, skillId: $scope.skill.id}, function () {
                alert.success('The photo has been deleted successfully.');
                $state.go('events.skill.photos', {eventId: $scope.skill.event.id, id: $scope.skill.id});
            });
        };
        $scope.save = function() {
            $scope.submitted = true;
            if ($scope.form.$valid) {
                if ($scope.imageLoading) {
                    image.then(function (image) {
                        $scope.photo.image_id = image.id;
                        $scope.photo.thumbnail_hash = image.thumbnail_hash;
                        $scope.photo.$update({eventId: $scope.skill.event.id, skillId: $scope.skill.id}, function () {
                            alert.success('The photo has been updated successfully.');
                            $state.go('events.skill.photos', {eventId: $scope.skill.event.id, id: $scope.skill.id});
                        });
                    });
                } else {
                    $scope.photo.$update({eventId: $scope.skill.event.id, skillId: $scope.skill.id, id: $scope.id}, function () {
                        alert.success('The photo has been updated successfully.');
                        $state.go('events.skill.photos', {eventId: $scope.skill.event.id, id: $scope.skill.id});
                    });
                }
            }
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
            angular.forEach($scope.translation.photos, function (photo) {
                photo.description = {text: '', lang_code: ''};
            });
        });
    });
    angular.module('eventsApp').controller('TranslationFormCtrl', function($scope, $stateParams, Skill, SkillPhoto, $http, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_IMAGES, $q, $upload, $state, WorldSkills, alert) {
        $scope.thumbnail = function (photo) {
            return photo.thumbnail + '_small';
        };
        $scope.save = function() {
            $scope.submitted = true;
            if ($scope.form.$valid) {
                $scope.loading = true;
                var langCode = $scope.translation.name.lang_code;
                var savePromises = [];
                angular.forEach($scope.translation.photos, function (photo) {
                    photo.description.lang_code = langCode;
                    savePromises.push(SkillPhoto.update({eventId: $scope.translation.event.id, skillId: $scope.translation.id, l: langCode}, photo));
                });
                $scope.translation.description.lang_code = langCode;
                $scope.translation.description_industry_action.lang_code = langCode;
                $scope.translation.description_required_skills.lang_code = langCode;
                $scope.translation.description_competition_action.lang_code = langCode;
                savePromises.push($scope.translation.$update({l: langCode}));
                $q.all(savePromises).then(function() {
                    alert.success('The translation has been updated successfully.');
                    $state.go('events.skill.translations', {eventId: $scope.skill.event.id, id: $scope.skill.id});
                });
            }
        };
    });
})();
