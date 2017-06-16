(function() {
    'use strict';

    angular.module('eventsApp').service('Country', function($resource, WORLDSKILLS_API_ORGANIZATIONS) {
        return $resource(WORLDSKILLS_API_ORGANIZATIONS + '/countries/:id', {
            id: '@id'
        }, {
            query: {
                method: 'GET'
            }
        });
    });
})();
