(function() {
    'use strict';

    angular.module('eventsApp').controller('EventsCtrl', function($scope, Event) {
        $scope.events = Event.query();
    });

    angular.module('eventsApp').controller('EventDetailCtrl', function($scope, $routeParams, Event) {
        $scope.event = Event.get({id: $routeParams.id}, function (event) {
            $scope.title = event.name;
        });
    });
})();
