(function() {
    'use strict';

    angular.module('eventsApp').controller('BaseSkillsCtrl', function($scope, BaseSkill) {
        $scope.baseSkills = BaseSkill.query({entity: 1, limit: 900});
    });

    angular.module('eventsApp').controller('BaseSkillCtrl', function($scope, $stateParams, BaseSkill) {
        $scope.id = $stateParams.id;
        $scope.baseSkill = BaseSkill.get({id: $scope.id}, function (baseSkill) {
            $scope.title = baseSkill.name.text;
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

})();
