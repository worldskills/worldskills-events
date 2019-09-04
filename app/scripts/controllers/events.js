(function() {
    'use strict';

    angular.module('eventsApp').controller('EventsCtrl', function($scope) {
        $scope.pagination = {
            itemsPerPage: 15
        };
        $scope.filters = {};
    });

    angular.module('eventsApp').controller('EventsListCtrl', function($scope, $state, $stateParams, Event, Country, WsEntity, auth, $http, EVENTS_APP_CODE, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_ORGANIZATIONS, WORLDSKILLS_API_AUTH, $translate, $uibModal, $filter, $location) {
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
        $scope.countries = Country.query();
        $scope.entitiesTree = [];
        $scope.entitiesIndexed = {};
        $scope.entityFilter = {query: ''};
        function parseTree(entity) {
            var node = {label: entity.name.text, children: [], entity: entity};
            angular.forEach(entity.children, function (child) {
                var childNode = parseTree(child);
                if (childNode !== false) {
                    node.children.push(childNode);
                }
            });
            if (node.label.toLowerCase().indexOf($scope.entityFilter.query.toLowerCase()) != -1 || node.children.length > 0) {
                if ($scope.entityFilter.query && node.children.length > 0) {
                    node.expanded = true;
                }
                return node;
            } else {
                return false;
            }
        }
        WsEntity.query(function(data) {
            $scope.entities = data.ws_entities;
            $scope.entitiesIndexed = {};
            angular.forEach(data.ws_entities, function (entity) {
                var node = parseTree(entity);
                if (node !== false) {
                    $scope.entitiesTree.push(node);
                }
            });
        });
        $scope.selectedEntity = null;
        $scope.selectEntity = function (entity) {
            $scope.filters.ws_entity = entity.entity.id;
            $scope.selectedEntity = entity;
        };
        $scope.clearEntity = function () {
            delete $scope.filters.ws_entity;
            $scope.selectedEntity = null;
            $scope.wsEntityModal.close();
        };
        $scope.okEntity = function (entity) {
            $scope.wsEntityModal.close();
        };
        $scope.filterEntityTree = function () {
            $scope.entitiesTree = [];
            angular.forEach($scope.entities, function (entity) {
                var node = parseTree(entity);
                if (node !== false) {
                    $scope.entitiesTree.push(node);
                }
            });
        };
        $scope.selectWsEntity = function () {
            $scope.wsEntityModal = $uibModal.open({
                templateUrl: 'views/ws_entity_tree.html',
                size: 'md',
                scope: $scope
            });
        };
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
        auth.user.$promise.then(function () {

            angular.forEach(auth.user.roles, function (r) {
                if (r.role_application.application_code === EVENTS_APP_CODE && r.name === 'Admin') {
                    $scope.canEdit = true;
                }
                if (r.role_application.application_code === EVENTS_APP_CODE && r.name === 'EditEvents') {
                    $scope.canEdit = true;
                    if (typeof $scope.filters.ws_entity !== 'undefined') {
                        $scope.filters.ws_entity = r.ws_entity.id;
                    }
                }
                if (r.role_application.application_code === EVENTS_APP_CODE && r.name === 'OrganizerEditEvents') {
                    if (typeof $scope.filters.ws_entity !== 'undefined') {
                        $scope.filters.ws_entity = r.ws_entity.id;
                    }
                }
            });

            $scope.search();
        });
    });
    angular.module('eventsApp').controller('EventCtrl', function($scope, $stateParams, Event, auth, EVENTS_APP_CODE, $http, $translate, $state, alert) {
        $scope.id = $stateParams.id;
        $scope.event = Event.get({id: $scope.id}, function (event) {
            $scope.title = event.name;
            $scope.type = event.type;
            auth.hasUserRole(EVENTS_APP_CODE, ['Admin', 'DeleteEvents'], $scope.event.ws_entity.id).then(function (hasUserRole) {
                $scope.canDelete = hasUserRole;
            });
            auth.hasUserRole(EVENTS_APP_CODE, ['Admin', 'EditEvents'], $scope.event.ws_entity.id).then(function (hasUserRole) {
                $scope.canEdit = hasUserRole;
            });
            auth.hasUserRole(EVENTS_APP_CODE, ['Admin', 'OrganizerEditEvents'], $scope.event.ws_entity.id).then(function (hasUserRole) {
                $scope.canOrganizerEdit = hasUserRole;
            });
        });
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
        $scope.event.country = {id: 0};
    });
    angular.module('eventsApp').controller('EventFormCtrl', function($scope, $stateParams, Event, Country, $http, $filter, WORLDSKILLS_API_EVENTS, WORLDSKILLS_API_AUTH, EVENTS_APP_CODE, $translate, $state, alert) {
        $scope.countries = Country.query(function () {
            $scope.countries.country_list.unshift({id: 0, name: {text: ''}});
        });
        $http({
            method: 'GET',
            url: WORLDSKILLS_API_AUTH + '/ws_entities',
            params: {
                limit: 9000,
                role: 'EditEvents',
                roleApp: EVENTS_APP_CODE
            }
        }).success(function(data, status, headers, config) {
            $scope.entities = data.ws_entity_list;
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
    angular.module('eventsApp').controller('EventSkillsCtrl', function($scope, $stateParams, alert, Event, SkillClone, $q, $http, $translate, $state, $timeout, WorldSkills) {
        $scope.loading = true;
        $scope.skills = [];
        var searchTimeout;
        $scope.event.$promise.then(function(data) {
            var url = WorldSkills.getLink(data.links, 'skills');
            $http({method: 'GET', url: url, params: {limit: 100, l: 'en'}}).success(function(data, status, headers, config) {
                angular.forEach(data.skills, function (skill) {
                    $scope.skills.push(skill);
                });
                $scope.loading = false;
            });
        });
        Event.query({limit: 300, type: 'competition'}, function (data) {
            $scope.events = data;
        });
        $scope.toggleChecked = function () {
            angular.forEach($scope.skills, function (skill) {
                skill.checked = $scope.skillsFilterChecked;
            });
        };
        $scope.cloneLoading = false;
        $scope.cloneDone = false;
        $scope.cloneSkills = function(event) {
            $scope.cloneLoading = true;
            var clonePromises = [];
            angular.forEach($scope.filteredSkills, function (skill) {
                if (skill.checked) {
                    clonePromises.push(SkillClone.clone({eventId: skill.event.id, id: skill.id}, {event: event}, function () {
                        skill.checked = false;
                    }).$promise);
                }
            });
            $q.all(clonePromises).then(function() {
                alert.success('The selected skills have been copied.', true);
                $scope.cloneLoading = false;
                $scope.cloneDone = true;
            });
        };
    });
    angular.module('eventsApp').controller('EventSectorsCtrl', function($scope, $stateParams, alert, Event, $q, $http, $translate, $state, $timeout, WorldSkills) {
        $scope.loading = true;
        $scope.sectors = [];
        var searchTimeout;
        $scope.event.$promise.then(function(data) {
            var url = WorldSkills.getLink(data.links, 'sectors');
            $http({method: 'GET', url: url, params: {limit: 100, l: 'en'}}).success(function(data, status, headers, config) {
                angular.forEach(data.sectors, function (sector) {
                    $scope.sectors.push(sector);
                });
                $scope.loading = false;
            });
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
    angular.module('eventsApp').controller('EventSkillTagsCtrl', function($scope, $stateParams, EventSkillTag, alert) {
        var getTags = function () {
            $scope.tags = EventSkillTag.query({eventId: $scope.id}, function () {
                EventSkillTag.query({eventId: $scope.id, l: 'ar_AE'}, function (arabicTags) {
                    angular.forEach(arabicTags.tags, function (arabicTag) {
                        angular.forEach($scope.tags.tags, function (tag) {
                            if (tag.id === arabicTag.id && arabicTag.name.lang_code === 'ar_AE') {
                                tag.arabic = arabicTag.name;
                            }
                        });
                    });
                });
            });
        };
        getTags();
        $scope.addTag = function() {
            $scope.submitted = true;
            if ($scope.tagName) {
                $scope.loading = true;
                EventSkillTag.save({eventId: $scope.event.id}, {name: {text: $scope.tagName, lang_code: 'en'}}, function (tag) {
                    if ($scope.tagNameArabic) {
                        tag.name.text = $scope.tagNameArabic;
                        tag.name.lang_code = 'ar_AE';
                        EventSkillTag.update({eventId: $scope.event.id}, tag, function () {
                            $scope.loading = false;
                            $scope.submitted = false;
                            $scope.tagName = '';
                            $scope.tagNameArabic = '';
                            alert.success('The tag has been added successfully.');
                            getTags();
                        });
                    } else {
                        $scope.loading = false;
                        $scope.submitted = false;
                        $scope.tagName = '';
                        alert.success('The tag has been added successfully.');
                        getTags();
                    }
                });
            }
        };
        $scope.saveTag = function(tag) {
            tag.submitted = true;
            if (tag.name.text && (!tag.arabic || tag.arabic.text)) {
                tag.loading = true;
                EventSkillTag.update({eventId: $scope.event.id}, tag, function () {
                    if (tag.arabic && tag.arabic.text) {
                        EventSkillTag.update({eventId: $scope.event.id, id: tag.id}, {name: {text: tag.arabic.text, lang_code: 'ar_AE'}}, function () {
                            $scope.loading = false;
                            $scope.submitted = false;
                            tag.editing = false;
                            alert.success('The tag has been updated successfully.');
                        });
                    } else {
                        tag.loading = false;
                        tag.submitted = false;
                        tag.editing = false;
                        alert.success('The tag has been updated successfully.');
                    }
                });
            }
        };
        $scope.removeTags = function() {
            var notRemoved = [];
            angular.forEach($scope.tags.tags, function (tag) {
                if (tag.checked) {
                    EventSkillTag.remove({eventId: $scope.event.id, id: tag.id});
                } else {
                    notRemoved.push(tag);
                }
            });
            $scope.tags.tags = notRemoved;
            alert.success('The selected tags have been removed.', true);
        };
    });

})();
