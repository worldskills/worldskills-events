(function() {
    'use strict';

    angular.module('eventsApp').controller('EventsCtrl', function($scope, Event) {
        $scope.events = Event.query();
    });

    angular.module('eventsApp').controller('EventDetailCtrl', function($scope, $routeParams, Event, $http, API_EVENTS) {
        $scope.event = Event.get({id: $routeParams.id}, function (event) {
            $scope.title = event.name;
        });
        $http({method: 'GET', url: API_EVENTS + '/countries'}).success(function(data, status, headers, config) {
            console.log(data);
            $scope.countries = data.countries;
        });
    });
})();
