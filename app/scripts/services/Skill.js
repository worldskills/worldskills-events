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
                method: 'PUT',
                params: {
                    l: '@name.lang_code'
                }
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
    
    angular.module('eventsApp').service('SkillTranslation', function($resource, $http, API_EVENTS) {
        return $resource(API_EVENTS + '/skills/:id/translations/:locale', {
            id: '@id',
            locale: '@locale'
        });
    });
})();
