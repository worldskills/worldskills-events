(function() {
    'use strict';

    angular.module('eventsApp').service('Sponsor', function($resource, API_EVENTS) {
        return $resource(API_EVENTS + '/sponsors/:id', {
            id: '@id'
        }, {
            query: {
                method: 'GET'
            },
            update: {
                method: 'PUT'
            }
        });
    });
})();
