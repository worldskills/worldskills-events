(function() {
    'use strict';

    angular.module('eventsApp').service('BaseSkill', function($resource, WORLDSKILLS_API_EVENTS) {
        return $resource(WORLDSKILLS_API_EVENTS + '/base_skills/:id', {
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
