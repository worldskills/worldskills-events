'use strict';

describe('Service: Event', function() {

    // load the service's module
    beforeEach(module('eventsApp'));

    // instantiate service
    var $httpBackend, Event;
    beforeEach(inject(function(_$httpBackend_, _Event_) {
        $httpBackend = _$httpBackend_;
        Event = _Event_;
    }));

    it('should load events', inject(function() {

        $httpBackend.expectGET('languages/en.json').respond({});
        $httpBackend.expectGET('languages/en.json').respond({});
        $httpBackend.expectGET('languages/en.json').respond({});

        $httpBackend.expectGET(new RegExp('/events/events')).respond({
            events: [
                {}, {}
            ]
        });

        var events = Event.query();

        $httpBackend.flush();

        expect(events.events.length).toBe(2);
    }));
});
