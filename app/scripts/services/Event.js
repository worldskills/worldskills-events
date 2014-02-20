(function() {
    'use strict';

    angular.module('eventsApp').service('Event', function($resource, API_EVENTS) {
        return $resource(API_EVENTS + '/events/:id', {
            id: '@id'
        }, {
            query: {
                method: 'GET'
            }
        });
    });
})();
