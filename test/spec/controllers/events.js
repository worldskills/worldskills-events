'use strict';

describe('Event Controllers', function() {

    // load the module
    beforeEach(module('eventsApp'));

    // catch views and languages requests
    beforeEach(inject(function($httpBackend) {

        $httpBackend.whenGET(/languages\/.*/).respond({});
        $httpBackend.whenGET(/views\/.*/).respond('');
    }));

    describe('EventsCtrl', function() {

        var $httpBackend, $scope, EventsCtrl;

        // Initialize the controller and a mock scope
        beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {

            $httpBackend = _$httpBackend_;

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

            $httpBackend.expectGET('http://localhost:8080/events/events?limit=10&offset=0').respond({
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

            $httpBackend.expectGET('http://localhost:8080/events/events?limit=10&offset=10').respond({
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

            $httpBackend.expectGET('http://localhost:8080/events/events?limit=10&offset=10').respond({
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

        var $httpBackend, $scope, EventCtrl;

        // Initialize the controller and a mock scope
        beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {

            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('http://localhost:8080/events/events/1').respond({
                id: 1,
                name: 'WorldSkills São Paulo 2015'
            });

            $scope = $rootScope.$new();

            EventCtrl = $controller('EventCtrl', {
                $scope: $scope,
                $stateParams: {
                    id: 1
                }
            });
        }));

        it('should load event', function() {

            $httpBackend.flush();

            expect($scope.title).toBe('WorldSkills São Paulo 2015');
            expect($scope.event.id).toBe(1);
        });
    });
});
