(function() {
    'use strict';

    angular.module('eventsApp').controller('EventsCtrl', function($scope, Event) {
        $scope.events = Event.query();
    });

    angular.module('eventsApp').controller('EventCtrl', function($scope, $stateParams, Event, $http, API_EVENTS, $translate, $state) {
        $scope.id = $stateParams.id;
        $scope.event = Event.get({id: $scope.id}, function (event) {
            $scope.title = event.name;
        });
    });

    angular.module('eventsApp').controller('EventDetailCtrl', function($scope, $stateParams, Event, $http, API_EVENTS, $translate, $state) {
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
                $state.go('events');
            });
        };
    });
    angular.module('eventsApp').controller('EventSkillsCtrl', function($scope, $stateParams, Event, $http, API_EVENTS, $translate, $state) {
        $scope.currentPage = 1;
        $scope.changePage = function (page) {
            $scope.event.$promise.then(function(data) {
                var url;
                angular.forEach(data.links, function (link) {
                   if (link.rel == 'skills') {
                       url = link.href;
                   } 
                });
                $http({method: 'GET', url: url + '?offset=' + ((page - 1) * 10)}).success(function(data, status, headers, config) {
                    $scope.skills = data;
                });
            });
        };
        $scope.changePage(1);
    });

    angular.module('eventsApp').controller('EventCreateCtrl', function($scope, Event, $http, API_EVENTS, $translate, $state) {
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
                $state.go('events');
            });
        };
    });
})();
