(function() {
    'use strict';

    angular.module('eventsApp').controller('EventsCtrl', function($scope, Event) {
        $scope.events = Event.query();
    });

    angular.module('eventsApp').controller('EventDetailCtrl', function($scope, $routeParams, Event, $http, API_EVENTS, $translate, $location) {
        $scope.id = $routeParams.id;
        $scope.event = Event.get({id: $scope.id}, function (event) {
            $scope.title = event.name;
        });
        $http({method: 'GET', url: API_EVENTS + '/countries'}).success(function(data, status, headers, config) {
            $scope.countries = [];
            angular.forEach(data.countries, function (code) {
                $translate(code).then(function (name) {                    
                    $scope.countries.push({code: code, name: name});
                });
            });
        });
        $http({method: 'GET', url: API_EVENTS + '/entities'}).success(function(data, status, headers, config) {
            $scope.entities = data.entities;
        });
        $scope.save = function() {
            $scope.submitted = true;
            $scope.loading = true;
            $scope.event.$update(function () {
                $location.path('/entries');
            });
        };
    });

    angular.module('eventsApp').controller('EventCreateCtrl', function($scope, Event, $http, API_EVENTS, $translate, $location) {
        $scope.event = new Event();
        $scope.event.code = '';
        $scope.event.town = '';
        $http({method: 'GET', url: API_EVENTS + '/countries'}).success(function(data, status, headers, config) {
            $scope.countries = [];
            angular.forEach(data.countries, function (code) {
                $translate(code).then(function (name) {                    
                    $scope.countries.push({code: code, name: name});
                });
            });
        });
        $http({method: 'GET', url: API_EVENTS + '/entities'}).success(function(data, status, headers, config) {
            $scope.entities = data.entities;
        });
        $scope.save = function() {
            $scope.submitted = true;
            if ($scope.form.$invalid) {
                console.log($scope.form.$invalid);
                angular.element($scope.form).find('.ng-invalid' ).focus();
                return;
            }
            $scope.loading = true;
            $scope.event.$save(function () {
                $location.path('/events');
            });
        };
    });
})();
