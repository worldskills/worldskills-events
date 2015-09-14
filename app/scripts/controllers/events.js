(function() {
    'use strict';

    angular.module('eventsApp').controller('EventsCtrl', function($scope) {
        $scope.pagination = {
            currentPage: 1,
            itemsPerPage: 15,
            sort: 'start_date_desc'
        };
    });

    angular.module('eventsApp').controller('EventsListCtrl', function($scope, $stateParams, Event, $http, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_ORGANIZATIONS, WORLDSKILLS_API_AUTH, $translate, $filter, $location) {
        var page = parseInt($stateParams.page, 10);
        var sort = $stateParams.sort;
        if (page) {
            $scope.pagination.currentPage = page;
        } else {
            $location.search('page', $scope.pagination.currentPage);
        }
        if (sort) {
            $scope.pagination.sort = sort;
        } else {
            $location.search('sort', $scope.pagination.sort);
        }
        $scope.load = function (page) {
            $scope.loading = true;
            $scope.events.events = [];
            var filters = angular.copy($scope.filters);
            filters.sort = $scope.pagination.sort;
            filters.before = $filter('date')(filters.before, 'yyyy-MM-dd');
            filters.after = $filter('date')(filters.after, 'yyyy-MM-dd');
            filters.offset = $scope.pagination.itemsPerPage * (page - 1); 
            Event.query(filters, function (data) {
                $scope.loading = false;
                $scope.events = data;
                $scope.pagination.currentPage = page;
            });
        };
        $http({method: 'GET', url: WORLDSKILLS_API_ORGANIZATIONS + '/countries'}).success(function(data, status, headers, config) {
            $scope.countries = [];
            angular.forEach(data.country_list, function (country) {
                $scope.countries.push({code: country.code, name: country.name.text});
            });
        });
        $http({
            method: 'GET',
            url: WORLDSKILLS_API_AUTH + '/ws_entities',
            params: {
                limit: 100
            }
        }).success(function(data, status, headers, config) {
            $scope.entities = data.ws_entity_list;
        });
        $scope.events = {
            events: []
        };
        $scope.search = function () {
            $scope.load($scope.pagination.currentPage);
        };
        $scope.changePage = function (page) {
            $location.search('page', page);
            $scope.load(page);
        };
        $scope.changeSort = function (sort) {
            $location.search('sort', sort);
            $scope.pagination.sort = sort;
            $scope.load($scope.pagination.currentPage);
        }
        $scope.clear = function () {
            $scope.filters = {
                limit: $scope.pagination.itemsPerPage
            };
            $scope.load($scope.pagination.currentPage);
        };
        $scope.clear();
    });

    angular.module('eventsApp').controller('EventCtrl', function($scope, $stateParams, Event, $http, $translate, $state, alert) {
        $scope.id = $stateParams.id;
        $scope.event = Event.get({id: $scope.id}, function (event) {
            $scope.title = event.name;
            $scope.type = event.type;
        });
        $scope.cloneEvent = function() {
            if (alert.confirm('Duplicating the Event will create a copy with all data associated (Sponsors, Skills, etc.). Click OK to proceed.')) {
                $scope.cloneLoading = true;
                Event.clone({id: $scope.id}, function (cloneEvent) {
                    alert.success('The Event has been duplicated successfully. Please edit the information of the duplicate below.');
                    $state.go('events.event.form', { id: cloneEvent.id });
                }, function (response) {
                    alert.warning('Error duplicating Event - ' + response.data.code + ': ' + response.data.user_msg);
                    $state.go('events.list');
                });
            }
        };
        $scope.deleteEvent = function() {
            if (alert.confirm('Deleting the Event will also delete all data associated with this Event. Click OK to proceed.')) {
                $scope.deleteLoading = true;
                $scope.event.$delete(function () {
                    alert.success('The Event has been deleted successfully.');
                    $state.go('events.list');
                });
            }
        };
    });
    angular.module('eventsApp').controller('EventCreateCtrl', function($scope, Event) {
        $scope.event = new Event();
        $scope.event.code = '';
        $scope.event.town = '';
    });
    angular.module('eventsApp').controller('EventFormCtrl', function($scope, $stateParams, Event, $http, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_ORGANIZATIONS, WORLDSKILLS_API_AUTH, $translate, $state, alert) {
        $http({method: 'GET', url: WORLDSKILLS_API_ORGANIZATIONS + '/countries'}).success(function(data, status, headers, config) {
            $scope.countries = [];
            angular.forEach(data.country_list, function (country) {
                $scope.countries.push({code: country.code, name: country.name.text});
            });
        });
        var ROLE_EDIT_EVENTS = 'EditEvents';
        var ROLE_APP_EVENTS = '400';
        $http({
            method: 'GET',
            url: WORLDSKILLS_API_AUTH + '/ws_entities',
            params: {
                limit: 100,
                role: ROLE_EDIT_EVENTS,
                roleApp: ROLE_APP_EVENTS
            }
        }).success(function(data, status, headers, config) {
            $scope.entities = data.ws_entity_list;
        });
        $http({
            method: 'GET',
            url: WORLDSKILLS_API_AUTH + '/ws_entities',
            params: {
                limit: 100
            }
        }).success(function(data, status, headers, config) {
            $scope.organizers = data.ws_entity_list;
        });
        $scope.updateStartDate = function () {
            if (typeof $scope.event.end_date == 'undefined') {
                $scope.event.end_date = $scope.event.start_date;
            }
        };
        $scope.save = function() {
            $scope.submitted = true;
            if ($scope.form.$valid) {
                $scope.loading = true;
                if ($scope.event.id) {
                    $scope.event.$update(function () {
                        alert.success('The Event has been saved successfully.');
                        $state.go('events.list');
                    });
                } else {
                    $scope.event.$save(function () {
                        alert.success('The Event has been added successfully.');
                        $state.go('events.list');
                    });
                }
            }
        };
    });
    angular.module('eventsApp').controller('EventSkillsCtrl', function($scope, $stateParams, Event, $http, $translate, $state, WorldSkills) {
        $scope.loading = true;
        $scope.skills = [];
        var getSkills = function (url) {
            $http({method: 'GET', url: url}).success(function(data, status, headers, config) {
                angular.forEach(data.skills, function (skill) {
                    $scope.skills.push(skill);
                });
                var next = WorldSkills.getLink(data.links, 'next');
                if (next) {
                    getSkills(next);
                } else {
                    $scope.loading = false;
                }
                if (data.total_count == 0) {
                    $scope.skills = null;
                }
            });
        };
        $scope.event.$promise.then(function(data) {
            var url = WorldSkills.getLink(data.links, 'skills');
            url += '?limit=50';
            getSkills(url);
        });
    });
    angular.module('eventsApp').controller('EventSponsorsCtrl', function($scope, $stateParams, Event, $http, $translate, $state, WorldSkills) {
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
                if (data.total_count == 0) {
                    $scope.sponsors = null;
                }
            });
        };
        $scope.event.$promise.then(function(data) {
            var url = WorldSkills.getLink(data.links, 'sponsors');
            getSponsors(url);
        });
    });

})();
