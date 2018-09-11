(function() {
    'use strict';

    angular.module('eventsApp').service('BaseSponsor', function($resource, WORLDSKILLS_API_EVENTS) {
        return $resource(WORLDSKILLS_API_EVENTS + '/base_sponsors/:id', {
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
