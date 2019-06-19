(function() {
    'use strict';

    angular.module('eventsApp').service('WsEntity', function($resource, WORLDSKILLS_API_EVENTS) {
        return $resource(WORLDSKILLS_API_EVENTS + '/ws_entities', {
        }, {
            query: {
                method: 'GET'
            }
        });
    });
})();
