(function() {
    'use strict';

    angular.module('eventsApp').controller('SkillCtrl', function($scope, $stateParams, Skill, $http, API_EVENTS, $translate, $state) {
        $scope.id = $stateParams.id;
        $scope.page = $stateParams.page;
        $scope.skill = Skill.get({id: $scope.id}, function (skill) {
            $scope.title = skill.name.text;
        });
    });
})();
