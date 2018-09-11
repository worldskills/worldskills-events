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

    angular.module('eventsApp').controller('BaseSkillPhotosCtrl', function($scope) {
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
