(function() {
    'use strict';

    angular.module('eventsApp').controller('EventsCtrl', function($scope, $stateParams, Event, $location) {
        var page = parseInt($stateParams.page, 10) || 1;
        $scope.itemsPerPage = 10;
        $scope.load = function (page) {
             Event.query({limit: $scope.itemsPerPage, offset: $scope.itemsPerPage * (page - 1)}, function (data) {
                $scope.events = data;
                $scope.currentPage = page;
            });
        };
        $scope.changePage = function (page) {
            $location.search('page', page);
            $scope.load(page);
        };
        $scope.load(page);
    });

    angular.module('eventsApp').controller('EventCtrl', function($scope, $stateParams, Event, $http, API_EVENTS, $translate, $state, alert) {
        $scope.id = $stateParams.id;
        $scope.event = Event.get({id: $scope.id}, function (event) {
            $scope.title = event.name;
        });
        $scope.deleteEvent = function() {
            $scope.deleteLoading = true;
            $scope.event.$delete(function () {
                alert.success('The Event has been deleted successfully.');
                $state.go('events');
            });
        };
    });
    angular.module('eventsApp').controller('EventCreateCtrl', function($scope, Event) {
        $scope.event = new Event();
        $scope.event.code = '';
        $scope.event.town = '';
    });
    angular.module('eventsApp').controller('EventFormCtrl', function($scope, $stateParams, Event, $http, API_EVENTS, $translate, $state, alert) {
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
            if ($scope.form.$valid) {
                $scope.loading = true;
                if ($scope.event.id) {
                    $scope.event.$update(function () {
                        alert.success('The Event has been saved successfully.');
                        $state.go('events');
                    });
                } else {
                    $scope.event.$save(function () {
                        alert.success('The Event has been created successfully.');
                        $state.go('events');
                    });
                }
            }
        };
    });
    angular.module('eventsApp').controller('EventSkillsCtrl', function($scope, $stateParams, Event, $http, API_EVENTS, $translate, $state, WorldSkills) {
        $scope.skills = [];
        var getSkills = function (url) {
            $http({method: 'GET', url: url}).success(function(data, status, headers, config) {
                angular.forEach(data.skills, function (skill) {
                    $scope.skills.push(skill);
                });
                var next = WorldSkills.getLink(data.links, 'next');
                if (next) {
                    getSkills(next);
                }
            });
        };
        $scope.event.$promise.then(function(data) {
            var url = WorldSkills.getLink(data.links, 'skills');
            getSkills(url);
        });
    });
    angular.module('eventsApp').controller('EventSponsorsCtrl', function($scope, $stateParams, Event, $http, API_EVENTS, $translate, $state, WorldSkills) {
        $scope.sponsors = [];
        var getSponsors = function (url) {
            $http({method: 'GET', url: url}).success(function(data, status, headers, config) {
                angular.forEach(data.sponsors, function (skill) {
                    $scope.sponsors.push(skill);
                });
                var next = WorldSkills.getLink(data.links, 'next');
                if (next) {
                    getSponsors(next);
                }
            });
        };
        $scope.event.$promise.then(function(data) {
            var url = WorldSkills.getLink(data.links, 'sponsors');
            getSponsors(url);
        });
    });

})();
