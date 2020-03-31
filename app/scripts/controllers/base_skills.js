(function() {
    'use strict';

    angular.module('eventsApp').controller('BaseSkillsCtrl', function($scope, BaseSkill) {
        $scope.baseSkills = BaseSkill.query({entity: 1, limit: 900});
    });

    angular.module('eventsApp').controller('BaseSkillCtrl', function($scope, $stateParams, BaseSkill) {
        $scope.id = $stateParams.id;
        $scope.baseSkill = BaseSkill.get({id: $scope.id}, function (baseSkill) {
            $scope.title = baseSkill.name.text;
            if (!$scope.baseSkill.description.lang_code) {
                $scope.baseSkill.description.lang_code = 'en';
            }
            if (!$scope.baseSkill.summary.lang_code) {
                $scope.baseSkill.summary.lang_code = 'en';
            }
            if (!$scope.baseSkill.summary.text) {
                $scope.baseSkill.summary.text = '';
            }
        });
    });

    angular.module('eventsApp').controller('BaseSkillFormCtrl', function($scope, $state, $stateParams, alert, BaseSkill, BaseSector) {
        $scope.baseSectors = BaseSector.query();
        $scope.save = function() {
            $scope.submitted = true;
            if ($scope.form.$valid) {
                $scope.loading = true;
                $scope.baseSkill.$update(function () {
                    alert.success('The Base Skill has been updated successfully.');
                    $state.go('base_skills');
                });
            }
        };
    });

    angular.module('eventsApp').controller('BaseSkillPhotosCtrl', function($scope, BaseSkillPhoto) {
        $scope.thumbnail = function (photo) {
            return photo.thumbnail + '_small';
        };
        $scope.moveUp = function (photo, sort) {
            var index = $scope.baseSkill.photos.indexOf(photo);
            var newPhoto = $scope.baseSkill.photos[index];
            var oldPhoto = $scope.baseSkill.photos[index - 1];
            $scope.baseSkill.photos[index - 1] = newPhoto;
            $scope.baseSkill.photos[index] = oldPhoto;
            newPhoto.sort = sort - 1;
            oldPhoto.sort = sort;
            BaseSkillPhoto.update({skillId: $scope.baseSkill.id}, newPhoto);
            BaseSkillPhoto.update({skillId: $scope.baseSkill.id}, oldPhoto);
        };
        $scope.moveDown = function (photo, sort) {
            var index = $scope.baseSkill.photos.indexOf(photo);
            var newPhoto = $scope.baseSkill.photos[index];
            var oldPhoto = $scope.baseSkill.photos[index + 1];
            $scope.baseSkill.photos[index + 1] = newPhoto;
            $scope.baseSkill.photos[index] = oldPhoto;
            newPhoto.sort = sort + 1;
            oldPhoto.sort = sort;
            BaseSkillPhoto.update({skillId: $scope.baseSkill.id}, newPhoto);
            BaseSkillPhoto.update({skillId: $scope.baseSkill.id}, oldPhoto);
        };
    });
    angular.module('eventsApp').controller('BaseSkillPhotoCreateCtrl', function($scope, $stateParams, BaseSkill, BaseSkillPhoto, $http, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_IMAGES, $q, $upload, $translate, $state, WorldSkills, alert) {
        var image = $q.when();
        $scope.imageLoading = false;
        $scope.skillId = $stateParams.skillId;
        $scope.baseSkill = BaseSkill.get({eventId: $scope.eventId, id: $scope.skillId}, function (skill) {
        });
        $scope.photo = new BaseSkillPhoto();
        $scope.photo.skill = $scope.baseSkill;
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
            var maxSort = 0;
            $scope.baseSkill.photos.forEach(function (photo) {
                maxSort = Math.max(maxSort, photo.sort);
            });
            $scope.photo.sort = maxSort + 1;
            if ($scope.form.$valid && $scope.imageLoading) {
                image.then(function (image) {
                    $scope.photo.image_id = image.id;
                    $scope.photo.thumbnail_hash = image.thumbnail_hash;
                    $scope.photo.$save({skillId: $scope.baseSkill.id}, function () {
                        alert.success('The photo has been added successfully.');
                        $state.go('base_skill.photos', {id: $scope.baseSkill.id});
                    });
                });
            }
        };
    });
    angular.module('eventsApp').controller('BaseSkillPhotoCtrl', function($scope, $stateParams, BaseSkill, BaseSkillPhoto, $http, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_IMAGES, $q, $upload, $translate, $state, WorldSkills, alert) {
        var image = $q.when();
        $scope.imageLoading = false;
        $scope.skillId = $stateParams.skillId;
        $scope.id = $stateParams.id;
        $scope.baseSkill = BaseSkill.get({id: $scope.skillId}, function (skill) {
        });
        $scope.photo = BaseSkillPhoto.get({skillId: $scope.skillId, id: $scope.id}, function (photo) {
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
            $scope.photo.$delete({skillId: $scope.baseSkill.id}, function () {
                alert.success('The photo has been deleted successfully.');
                $state.go('base_skill.photos', {id: $scope.baseSkill.id});
            });
        };
        $scope.save = function() {
            $scope.submitted = true;
            if ($scope.form.$valid) {
                if ($scope.imageLoading) {
                    image.then(function (image) {
                        $scope.photo.image_id = image.id;
                        $scope.photo.thumbnail_hash = image.thumbnail_hash;
                        $scope.photo.$update({skillId: $scope.baseSkill.id}, function () {
                            alert.success('The photo has been updated successfully.');
                            $state.go('base_skill.photos', {id: $scope.baseSkill.id});
                        });
                    });
                } else {
                    $scope.photo.$update({skillId: $scope.baseSkill.id, id: $scope.id}, function () {
                        alert.success('The photo has been updated successfully.');
                        $state.go('base_skill.photos', {id: $scope.baseSkill.id});
                    });
                }
            }
        };
    });

    angular.module('eventsApp').controller('BaseSkillTagsCtrl', function($scope, alert, WsEntityBaseSkillTag, BaseSkillTag) {
        var getTags = function () {
            $scope.baseTags = WsEntityBaseSkillTag.query({wsEntityId: 1}, function () {
                $scope.baseSkill.$promise.then(function () {
                    angular.forEach($scope.baseSkill.tags, function (skillTag) {
                        angular.forEach($scope.baseTags.tags, function (tag) {
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
            BaseSkillTag.update({baseSkillId: $scope.baseSkill.id, baseSkillTagId: tag.id}, {});
            $scope.baseSkill.tags.push(tag);
            getTags();
            alert.success('The tag has been added.', true);
            return false;
        };
        $scope.removeTags = function() {
            var notRemoved = [];
            angular.forEach($scope.baseSkill.tags, function (tag) {
                if (tag.checked) {
                    BaseSkillTag.remove({baseSkillId: $scope.baseSkill.id, baseSkillTagId: tag.id}, {});
                } else {
                    notRemoved.push(tag);
                }
            });
            $scope.baseSkill.tags = notRemoved;
            getTags();
            alert.success('The selected tags have been removed.', true);
        };
    });

    angular.module('eventsApp').controller('BaseSkillBaseSponsorsCtrl', function($scope, alert, BaseSponsor, BaseSkillSponsor) {
      var getBaseSponsors = function () {
          $scope.baseSponsors = BaseSponsor.query({entity: 1, limit: 900}, function () {
              $scope.baseSkill.$promise.then(function () {
                  angular.forEach($scope.baseSkill.sponsors, function (baseSkillBaseSponsor) {
                      angular.forEach($scope.baseSponsors.base_sponsors, function (baseSponsor) {
                          if (baseSponsor.id === baseSkillBaseSponsor.id) {
                              baseSponsor.used = true;
                          }
                      });
                  });
              });
          });
      };
      getBaseSponsors();
      $scope.addBaseSponsor = function (baseSponsor) {
          BaseSkillSponsor.update({baseSkillId: $scope.baseSkill.id, baseSponsorId: baseSponsor.id}, {});
          $scope.baseSkill.sponsors.push(baseSponsor);
          getBaseSponsors();
          alert.success('The Base Sponsor has been added.', true);
          return false;
      };
      $scope.removeBaseSponsors = function() {
          var notRemoved = [];
          angular.forEach($scope.baseSkill.sponsors, function (baseSponsor) {
              if (baseSponsor.checked) {
                  BaseSkillSponsor.remove({baseSkillId: $scope.baseSkill.id, baseSponsorId: baseSponsor.id}, {});
              } else {
                  notRemoved.push(baseSponsor);
              }
          });
          $scope.baseSkill.sponsors = notRemoved;
          getBaseSponsors();
          alert.success('The selected Base Sponsors have been removed.', true);
      };
    });

})();
