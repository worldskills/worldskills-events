(function() {
    'use strict';

    angular.module('eventsApp').controller('SkillCreateCtrl', function($scope, $stateParams, Skill, Event, $http, API_EVENTS, $translate, $state, WorldSkills) {
        $scope.skill = new Skill();
        $scope.skill.name = {text: '', lang_code: 'en'};
        $scope.skill.description = {text: '', lang_code: 'en'};
        $scope.skill.event = Event.get({id: $stateParams.eventId});
        $scope.save = function() {
            $scope.submitted = true;
            if ($scope.form.$invalid) {
                angular.element($scope.form).find('.ng-invalid').focus();
                return;
            }
            $scope.loading = true;
            $scope.skill.$save(function () {
                $state.go('event.skills', {id: $scope.skill.event.id});
            });
        };
    });

    angular.module('eventsApp').controller('SkillCtrl', function($scope, $stateParams, Skill, $http, API_EVENTS, $translate, $state, WorldSkills) {
        $scope.id = $stateParams.id;
        $scope.skill = Skill.get({id: $scope.id}, function (skill) {
            $scope.title = skill.name.text;
            var url = WorldSkills.getLink(skill.event.links, 'sectors');
            $http({method: 'GET', url: url}).success(function(data, status, headers, config) {
                $scope.sectors = data.sectors;
            });
        });
        $scope.save = function() {
            $scope.submitted = true;
            if ($scope.form.$invalid) {
                angular.element($scope.form).find('.ng-invalid' ).focus();
                return;
            }
            $scope.loading = true;
            $scope.skill.$update(function () {
                $state.go('event.skills', {id: $scope.skill.event.id});
            });
        };
    });
})();
