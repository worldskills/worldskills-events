(function() {
    'use strict';

    angular.module('eventsApp').controller('SkillCtrl', function($scope, $stateParams, Skill, $http, API_EVENTS, $translate, $state, WorldSkills) {
        $scope.id = $stateParams.id;
        $scope.page = $stateParams.page;
        $scope.skill = Skill.get({id: $scope.id}, function (skill) {
            $scope.title = skill.name.text;
            var url = WorldSkills.getLink(skill.event.links, 'sectors');
            $http({method: 'GET', url: url}).success(function(data, status, headers, config) {
                $scope.sectors = data.sectors;
            });
        });
    });
})();
