'use strict';

describe('Service: Event', function() {

    // load the service's module
    beforeEach(module('eventsApp'));

    // instantiate service
    var $httpBackend, Event;
    beforeEach(inject(function(_$httpBackend_, _Event_) {

        $httpBackend = _$httpBackend_;
        $httpBackend.whenGET(/languages\/.*/).respond({});
        $httpBackend.whenGET(/views\/.*/).respond('');

        Event = _Event_;
    }));

    it('should load events', inject(function() {

        $httpBackend.expectGET(/events/).respond({
            events: [
                {}, {}
            ]
        });

        var events = Event.query();

        $httpBackend.flush();

        expect(events.events.length).toBe(2);
    }));
});
