(function() {
    'use strict';

    angular.module('eventsApp').controller('EventsCtrl', function($scope) {
        $scope.pagination = {
            itemsPerPage: 15
        };
        $scope.filters = {};
    });

    angular.module('eventsApp').controller('EventsListCtrl', function($scope, $state, $stateParams, Event, $http, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_ORGANIZATIONS, WORLDSKILLS_API_AUTH, $translate, $filter, $location) {
        angular.forEach($stateParams, function (value, key) {
            if (value) {
                $scope.filters[key] = value;
            }
        });
        $scope.init = function () {
            if ($scope.filters.page) {
                $scope.filters.page = parseInt($scope.filters.page, 10);
            } else {
                $scope.filters.page = 1;
            }
            if (!$scope.filters.sort) {
                $scope.filters.sort = 'start_date_desc';
            }
            if ($scope.filters.before) {
                $scope.filters.before = new Date($filter('date')($scope.filters.before, 'medium'));
            }
            if ($scope.filters.after) {
                $scope.filters.after = new Date($filter('date')($scope.filters.after, 'medium'));
            }
        };
        $scope.load = function (page) {
            $scope.loading = true;
            $scope.events.events = [];

            var params = angular.copy($scope.filters);
            params.before = $filter('date')(params.before, 'yyyy-MM-dd');
            params.after = $filter('date')(params.after, 'yyyy-MM-dd');
            $location.search(params);
            $location.search('page', page);

            var filters = angular.copy($scope.filters);
            filters.before = $filter('date')(filters.before, 'yyyy-MM-dd');
            filters.after = $filter('date')(filters.after, 'yyyy-MM-dd');
            filters.offset = $scope.pagination.itemsPerPage * (page - 1);
            filters.limit = $scope.pagination.itemsPerPage;
            delete filters.page;

            Event.query(filters, function (data) {
                $scope.loading = false;
                $scope.events = data;
                $scope.filters.page = page;
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
            $scope.load($scope.filters.page);
        };
        $scope.changeSort = function (sort) {
            $scope.filters.sort = sort;
            $scope.search();
        };
        $scope.clear = function () {
            $state.go('.', {}, {inherit: false, reload: true});
        };
        $scope.init();
        $scope.search();
    });
    angular.module('eventsApp').controller('EventCtrl', function($scope, $stateParams, Event, auth, EVENTS_APP_CODE, $http, $translate, $state, alert) {
        $scope.id = $stateParams.id;
        $scope.event = Event.get({id: $scope.id}, function (event) {
            $scope.title = event.name;
            $scope.type = event.type;
            auth.hasUserRole(EVENTS_APP_CODE, ['Admin', 'DeleteEvents'], $scope.event.ws_entity.id).then(function (hasUserRole) {
                $scope.canDelete = hasUserRole;
            });
        });
        $scope.cloneEvent = function() {
            if (alert.confirm('Duplicating the Event will create a copy with all data associated (Sponsors, Skills, etc.). Click OK to proceed.')) {
                $scope.cloneLoading = true;
                Event.clone({id: $scope.id}, function (cloneEvent) {
                    alert.success('The Event has been duplicated successfully. Please edit the information of the duplicate below.');
                    $state.go('events.event.form', { id: cloneEvent.id });
                }, function (response) {
                    alert.error('Error duplicating Event. ' + response.data.code + ': ' + response.data.user_msg);
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
        $scope.event.start_date = new Date();
        $scope.event.end_date = new Date();
        $scope.event.code = '';
        $scope.event.town = '';
    });
    angular.module('eventsApp').controller('EventFormCtrl', function($scope, $stateParams, Event, $http, $filter, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_ORGANIZATIONS, WORLDSKILLS_API_AUTH, EVENTS_APP_CODE, $translate, $state, alert) {
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
                limit: 100,
                role: 'EditEvents',
                roleApp: EVENTS_APP_CODE
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
        $scope.$watch('event.start_date', function(newValue, oldValue) {
            if (angular.isDate(newValue)) {
                if (angular.isDate(oldValue)) {
                    var diff = newValue.getTime() - oldValue.getTime();
                    var endDate = $scope.event.end_date;
                    if (angular.isDate(endDate)) {
                        $scope.event.end_date = new Date(endDate.getTime() + diff);
                    }
                }
                if (!angular.isDate($scope.event.end_date)) {
                    $scope.event.end_date = new Date(newValue.getTime());
                }
            }
        });
        $scope.checkUrl = function() {
            if ($scope.event.url != '') {
                if (!/^http/i.test($scope.event.url)) {
                    $scope.event.url = 'http://' + $scope.event.url;
                }
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
    angular.module('eventsApp').controller('EventSkillsCtrl', function($scope, $stateParams, Event, $http, $translate, $state, $timeout, WorldSkills) {
        $scope.loading = true;
        $scope.skills = [];
        $scope.skillsFilter = {};
        $scope.skillsFilter.limit = 50;
        $scope.skillsFilter.l = 'en';
        var url = '';
        var searchTimeout;
        var getSkills = function (url, params) {
            $http({method: 'GET', url: url, params: params}).success(function(data, status, headers, config) {
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
            url = WorldSkills.getLink(data.links, 'skills');
            getSkills(url, $scope.skillsFilter);
        });
        var searchSkills = function () {
            $scope.loading = true;
            $scope.skills = [];
            getSkills(url, $scope.skillsFilter);
        };
        $scope.search = function () {
            $timeout.cancel(searchTimeout);
            searchTimeout = $timeout(searchSkills, 300);
        };
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
