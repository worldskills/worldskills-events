'use strict';

describe('controllers events', function() {

    // load the module
    beforeEach(module('eventsApp'));

    beforeEach(function() {
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    // catch views and languages requests
    beforeEach(inject(function($httpBackend) {

        $httpBackend.whenGET(/languages\/.*/).respond({
            "AQ": "Antarctica"
        });
        $httpBackend.whenGET(/views\/.*/).respond('');
    }));

    describe('EventsCtrl', function() {

        var $httpBackend, $scope, EventsCtrl;

        // Initialize the controller and a mock scope
        beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {

            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('http://localhost:8080/events/countries').respond({
                countries: [
                    'AQ'
                ]
            });
            $httpBackend.expectGET('http://localhost:8080/auth/ws_entities').respond({
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

            EventsCtrl = function(stateParams) {
                $controller('EventsCtrl', {
                    $scope: $scope,
                    $stateParams: stateParams || {}
                });
            };
        }));

        it('should paginate events', function() {

            EventsCtrl();

            $httpBackend.expectGET('http://localhost:8080/events?limit=15&offset=0').respond({
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

            $scope.changePage(2);

            $httpBackend.expectGET('http://localhost:8080/events?limit=15&offset=15').respond({
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

            EventsCtrl({
                page: '2'
            });

            $httpBackend.expectGET('http://localhost:8080/events?limit=15&offset=15').respond({
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
        beforeEach(inject(function(_$httpBackend_, $controller, _$state_, $rootScope) {

            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('http://localhost:8080/events/1').respond({
                id: 1,
                name: 'WorldSkills São Paulo 2015'
            });

            $scope = $rootScope.$new();

            $state = _$state_;
            $state.go = jasmine.createSpy();

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

            expect($state.go).toHaveBeenCalledWith('events');
        });
    });

    describe('EventFormCtrl', function() {

        var $httpBackend, $scope, $state, EventFormCtrl;

        // Initialize the controller and a mock scope
        beforeEach(inject(function(_$httpBackend_, $controller, _$state_, $rootScope, Event) {

            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('http://localhost:8080/events/countries').respond({
                countries: [
                    'AQ'
                ]
            });
            $httpBackend.expectGET('http://localhost:8080/auth/ws_entities?role=EditEvents&roleApp=400').respond({
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

        it('should load countries and entities', function() {

            expect($scope.countries).toEqualData([
                {
                    code: 'AQ',
                    name: 'Antarctica'
                }
            ]);
            expect($scope.countries.length).toBe(1);
        });

        it('should save', function() {

            $scope.save();

            $httpBackend.expectPUT('http://localhost:8080/events/1', {
                id: 1
            }).respond({});
            $httpBackend.flush();

            expect($state.go).toHaveBeenCalledWith('events');
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

            $httpBackend.expectGET('http://localhost:8080/events/skills').respond({
                skills: [
                    {
                        name: 'Web Design'
                    }, {
                        name: 'Landscape Gardening'
                    }
                ],
                links: [
                    {
                        rel: 'next',
                        href: 'http://localhost:8080/events/skills?offset=2'
                    }
                ]
            });
            $httpBackend.expectGET('http://localhost:8080/events/skills?offset=2').respond({
                skills: [
                    {
                        name: 'Hairdressing'
                    }
                ],
                links: []
            });
            $httpBackend.flush();

            expect($scope.skills.length).toBe(3);
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

            expect($scope.event).toEqualData({
                code: '',
                town: ''
            });
        });
    });
});
