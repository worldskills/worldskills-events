'use strict';

describe('Controller: EventsCtrl', function() {

    // load the controller's module
    beforeEach(module('eventsApp'));

    var $httpBackend, EventsCtrl, $scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {

        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET(/languages\/.*/).respond({});
        $httpBackend.whenGET(/views\/.*/).respond('');

        $scope = $rootScope.$new();

        EventsCtrl = function(stateParams) {
            $controller('EventsCtrl', {
                $scope: $scope,
                $stateParams: stateParams || {}
            });
        };
    }));

    it('should attach a list of events to the scope', function() {

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

        EventsCtrl({page: '2'});

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
