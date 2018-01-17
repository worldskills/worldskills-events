(function() {
    'use strict';

    angular.module('eventsApp').service('Sector', function($resource, WORLDSKILLS_API_EVENTS) {
        return $resource(WORLDSKILLS_API_EVENTS + '/:eventId/sectors/:id', {
            eventId: '@event.id',
            id: '@id'
        }, {
            query: {
                method: 'GET'
            },
            update: {
                method: 'PUT',
                params: {
                    l: '@name.lang_code'
                }
            }
        });
    });

})();
