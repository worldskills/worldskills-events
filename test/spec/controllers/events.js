'use strict';

describe('Controller: EventsCtrl', function() {

    // load the controller's module
    beforeEach(module('eventsApp'));

    var EventsCtrl, scope, Event;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {

        scope = $rootScope.$new();
        Event = {};

        Event.query = jasmine.createSpy().andReturn([
            {}, {}
        ]);

        EventsCtrl = $controller('EventsCtrl', {
            $scope: scope,
            Event: Event
        });
    }));

    it('should attach a list of events to the scope', function() {
        expect(scope.events.length).toBe(2);
        expect(Event.query).toHaveBeenCalled();
    });
});
