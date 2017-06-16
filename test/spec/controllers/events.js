'use strict';

describe('controllers events', function() {

    // load the module
    beforeEach(module('eventsApp'));

    // catch views and languages requests
    beforeEach(inject(function($httpBackend) {

        $httpBackend.whenGET(/languages\/.*/).respond({
            "AQ": "Antarctica"
        });
        $httpBackend.whenGET(/views\/.*/).respond('');
    }));

    describe('EventsListCtrl', function() {

        var $httpBackend, $scope, EventsListCtrl;

        // Initialize the controller and a mock scope
        beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {

            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('http://localhost:8080/auth/users/loggedIn?show_child_roles=true&app_code=400').respond({
                'id': 1,
                'person_id': 2,
                'first_name': 'Bat',
                'last_name': 'Man',
                'username': 'batman@batcave.com',
                'roles': [{
                    'id': 1,
                    'name': 'Admin',
                    'apply_per_entity': false,
                    'role_application': {
                        'application_code': 400
                    }
                }],
            });
            $httpBackend.expectGET('http://localhost:8080/org/countries').respond({
                country_list: [
                    {
                        id: 1,
                        code: 'AQ',
                        name: {
                            text: 'Antarctica'
                        }
                    }
                ]
            });
            $httpBackend.expectGET('http://localhost:8080/auth/ws_entities?limit=200').respond({
                entities: [
                    {
                        id: 1,
                        name: {
                            lang_code: 'en',
                            text: 'WorldSkills International'
                        },
                        code: 'WSI'
                    }
                ]
            });

            $scope = $rootScope.$new();
            $scope.pagination = {
                itemsPerPage: 15
            };
            $scope.filters = {
            };

            EventsListCtrl = function(stateParams) {
                $controller('EventsListCtrl', {
                    $scope: $scope,
                    $stateParams: stateParams || {}
                });
            };
        }));

        it('should paginate events', function() {

            EventsListCtrl();

            $httpBackend.expectGET('http://localhost:8080/events?limit=15&offset=0&sort=start_date_desc').respond({
                events: [
                    {
                        name: 'WorldSkills São Paulo 2015'
                    }, {
                        name: 'WorldSkills Leipzig 2013'
                    }
                ]
            });
            $httpBackend.flush();

            expect($scope.events.events.length).toBe(2);

            $scope.filters.page = 2;
            $scope.search();

            $httpBackend.expectGET('http://localhost:8080/events?limit=15&offset=15&sort=start_date_desc').respond({
                events: [
                    {
                        name: 'WorldSkills London 2011'
                    }
                ]
            });
            $httpBackend.flush();

            expect($scope.events.events.length).toBe(1);
        });

        it('should go to page passed by stateParams', function() {

            EventsListCtrl({
                page: '2'
            });

            $httpBackend.expectGET('http://localhost:8080/events?limit=15&offset=15&sort=start_date_desc').respond({
                events: [
                    {
                        name: 'WorldSkills London 2011'
                    }
                ]
            });
            $httpBackend.flush();

            expect($scope.events.events.length).toBe(1);
        });
    });

    describe('EventCtrl', function() {

        var $httpBackend, $scope, $state, EventCtrl;

        // Initialize the controller and a mock scope
        beforeEach(inject(function(_$httpBackend_, $controller, _$state_, alert, $rootScope) {

            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('http://localhost:8080/auth/users/loggedIn?show_child_roles=true&app_code=400').respond({
                'id': 1,
                'person_id': 2,
                'first_name': 'Bat',
                'last_name': 'Man',
                'username': 'batman@batcave.com',
                'roles': [{
                    'id': 1,
                    'name': 'Admin',
                    'apply_per_entity': false,
                    'role_application': {
                        'application_code': 400
                    }
                }],
            });
            $httpBackend.expectGET('http://localhost:8080/events/1').respond({
                id: 1,
                name: 'WorldSkills São Paulo 2015',
                ws_entity: {
                    id: 1
                }
            });

            $scope = $rootScope.$new();

            $state = _$state_;
            $state.go = jasmine.createSpy();

            alert.confirm = function () {
            	return true;
            };

            EventCtrl = $controller('EventCtrl', {
                $scope: $scope,
                $state: $state,
                $stateParams: {
                    id: 1
                }
            });

            $httpBackend.flush();
        }));

        it('should load event', function() {

            expect($scope.title).toBe('WorldSkills São Paulo 2015');
            expect($scope.event.id).toBe(1);
        });

        it('should delete event', function() {

            $scope.deleteEvent();

            $httpBackend.expectDELETE('http://localhost:8080/events/1').respond('');
            $httpBackend.flush();

            expect($state.go).toHaveBeenCalledWith('events.list');
        });
    });

    describe('EventFormCtrl', function() {

        var $httpBackend, $scope, $state, EventFormCtrl;

        // Initialize the controller and a mock scope
        beforeEach(inject(function(_$httpBackend_, $controller, _$state_, $rootScope, Event) {

            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('http://localhost:8080/org/countries').respond({
                country_list: [
                    {
                        id: 1,
                        code: 'AQ',
                        name: {
                            text: 'Antarctica'
                        }
                    }
                ]
            });
            $httpBackend.expectGET('http://localhost:8080/auth/ws_entities?limit=100&role=EditEvents&roleApp=400').respond({
                entities: [
                    {
                        id: 1,
                        name: {
                            lang_code: 'en',
                            text: 'WorldSkills International'
                        },
                        code: 'WSI'
                    }
                ]
            });
            $httpBackend.expectGET('http://localhost:8080/auth/ws_entities?limit=200').respond({
                entities: [
                    {
                        id: 1,
                        name: {
                            lang_code: 'en',
                            text: 'WorldSkills International'
                        },
                        code: 'WSI'
                    }
                ]
            });

            $scope = $rootScope.$new();
            $scope.form = {
                $valid: true
            };
            $scope.event = new Event();
            $scope.event.id = 1;

            $state = _$state_;
            $state.go = jasmine.createSpy();

            EventFormCtrl = $controller('EventFormCtrl', {
                $scope: $scope,
                $state: $state
            });

            $httpBackend.flush();
        }));

        it('should save', function() {

            $scope.save();

            $httpBackend.expectPUT('http://localhost:8080/events/1', {
                id: 1
            }).respond({});
            $httpBackend.flush();

            expect($state.go).toHaveBeenCalledWith('events.list');
        });
    });

    describe('EventSkillsCtrl', function() {

        var $httpBackend, $scope, EventSkillsCtrl, event;

        // Initialize the controller and a mock scope
        beforeEach(inject(function(_$httpBackend_, $controller, $rootScope, $q) {

            $httpBackend = _$httpBackend_;

            event = $q.defer();

            $scope = $rootScope.$new();
            $scope.event = {
                $promise: event.promise
            };

            EventSkillsCtrl = $controller('EventSkillsCtrl', {
                $scope: $scope
            });
        }));

        it('should load all skills', function() {

            event.resolve({
                links: [
                    {
                        rel: 'skills',
                        href: 'http://localhost:8080/events/skills'
                    }
                ]
            });

            $httpBackend.expectGET('http://localhost:8080/events/skills?l=en&limit=100').respond({
                skills: [
                    {
                        name: 'Web Design'
                    }, {
                        name: 'Landscape Gardening'
                    }
                ]
            });
            $httpBackend.flush();

            expect($scope.skills.length).toBe(2);
        });
    });

    describe('EventSponsorsCtrl', function() {

        var $httpBackend, $scope, EventSponsorsCtrl, event;

        // Initialize the controller and a mock scope
        beforeEach(inject(function(_$httpBackend_, $controller, $rootScope, $q) {

            $httpBackend = _$httpBackend_;

            event = $q.defer();

            $scope = $rootScope.$new();
            $scope.event = {
                $promise: event.promise
            };

            EventSponsorsCtrl = $controller('EventSponsorsCtrl', {
                $scope: $scope
            });
        }));

        it('should load all sponsors', function() {

            event.resolve({
                links: [
                    {
                        rel: 'sponsors',
                        href: 'http://localhost:8080/events/sponsors'
                    }
                ]
            });

            $httpBackend.expectGET('http://localhost:8080/events/sponsors').respond({
                sponsors: [
                    {
                        name: 'Autodesk'
                    }, {
                        name: '3M'
                    }
                ],
                links: [
                    {
                        rel: 'next',
                        href: 'http://localhost:8080/events/sponsors?offset=2'
                    }
                ]
            });
            $httpBackend.expectGET('http://localhost:8080/events/sponsors?offset=2').respond({
                sponsors: [
                    {
                        name: 'Cisco'
                    }
                ],
                links: []
            });
            $httpBackend.flush();

            expect($scope.sponsors.length).toBe(3);
        });
    });

    describe('EventCreateCtrl', function() {

        var $scope, EventCreateCtrl;

        // Initialize the controller and a mock scope
        beforeEach(inject(function($controller, $rootScope) {

            $scope = $rootScope.$new();

            EventCreateCtrl = $controller('EventCreateCtrl', {
                $scope: $scope
            });
        }));

        it('should initialize an event', function() {

            expect($scope.event).toEqual(jasmine.any(Object));
            expect($scope.event.start_date).toEqual(jasmine.any(Date));
            expect($scope.event.end_date).toEqual(jasmine.any(Date));
            expect($scope.event.code).toBe('');
            expect($scope.event.town).toBe('');
        });
    });
});
