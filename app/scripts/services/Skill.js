(function() {
    'use strict';

    angular.module('eventsApp').service('Skill', function($resource, WORLDSKILLS_API_EVENTS) {
        return $resource(WORLDSKILLS_API_EVENTS + '/:eventId/skills/:id', {
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

    angular.module('eventsApp').service('EventSkillTag', function($resource, WORLDSKILLS_API_EVENTS) {
        return $resource(WORLDSKILLS_API_EVENTS + '/:eventId/skill_tags/:id', {
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

    angular.module('eventsApp').service('SkillPhoto', function($resource, WORLDSKILLS_API_EVENTS) {
        return $resource(WORLDSKILLS_API_EVENTS + '/:eventId/skills/:skillId/photos/:id', {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });

    angular.module('eventsApp').service('SkillTranslation', function($resource, $http, WORLDSKILLS_API_EVENTS) {
        return $resource(WORLDSKILLS_API_EVENTS + '/:eventId/skills/:id/translations/:locale', {
            eventId: '@event.id',
            id: '@id',
            locale: '@locale'
        });
    });

    angular.module('eventsApp').service('SkillTag', function($resource, $http, WORLDSKILLS_API_EVENTS) {
        return $resource(WORLDSKILLS_API_EVENTS + '/:eventId/skills/:skillId/tags/:id', {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });

    angular.module('eventsApp').service('SkillSponsor', function($resource, $http, WORLDSKILLS_API_EVENTS) {
        return $resource(WORLDSKILLS_API_EVENTS + '/:eventId/skills/:skillId/sponsors/:id', {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });

    angular.module('eventsApp').service('SkillClone', function($resource, WORLDSKILLS_API_EVENTS) {
        return $resource(WORLDSKILLS_API_EVENTS + '/:eventId/skills/:id/clone', {
        }, {
            clone: {
                method: 'POST'
            }
        });
    });

})();
