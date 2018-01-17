(function() {
    'use strict';

    angular.module('eventsApp').service('BaseSector', function($resource, WORLDSKILLS_API_EVENTS) {
        return $resource(WORLDSKILLS_API_EVENTS + '/base_sectors', {}, {
            query: {
                method: 'GET'
            }
        });
    });

})();
