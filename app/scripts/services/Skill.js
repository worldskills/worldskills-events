(function() {
    'use strict';

    angular.module('eventsApp').service('Skill', function($resource, API_EVENTS) {
        return $resource(API_EVENTS + '/skills/:id', {
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

    angular.module('eventsApp').service('SkillPhoto', function($resource, API_EVENTS) {
        return $resource(API_EVENTS + '/skills/:id/photos/:photo', {
        }, {
            update: {
                method: 'PUT'
            }
        });
    });
})();
