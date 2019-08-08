(function() {
    'use strict';

    angular.module('eventsApp').controller('ContainerCtrl', function($scope, $state, auth, alert, ENVIRONMENT_WARNING) {
        $scope.auth = auth;
        $scope.$on('$stateChangeStart', function () {
            alert.clear();
        });
        $scope.date = new Date();
        $scope.search = function () {
            $state.go('events.list', {name: $scope.searchText}, {inherit: false, reload: true});
        };
        $scope.environmentWarning = ENVIRONMENT_WARNING;
    });
})();
