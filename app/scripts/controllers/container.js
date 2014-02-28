(function() {
    'use strict';

    angular.module('eventsApp').controller('ContainerCtrl', function($scope, auth) {
        $scope.auth = auth;
        $scope.logout = function (e) {
            auth.logout();
        };
    });
})();
