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

    angular.module('eventsApp').service('BaseSkillPhoto', function($resource, WORLDSKILLS_API_EVENTS) {
        return $resource(WORLDSKILLS_API_EVENTS + '/base_skills/:skillId/photos/:id', {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });

    angular.module('eventsApp').service('WsEntityBaseSkillTag', function($resource, WORLDSKILLS_API_EVENTS) {
        return $resource(WORLDSKILLS_API_EVENTS + '/ws_entities/:wsEntityId/base_skill_tags/:id', {
            id: '@id'
        }, {
            query: {
                method: 'GET'
            }
        });
    });

    angular.module('eventsApp').service('BaseSkillTag', function($resource, $http, WORLDSKILLS_API_EVENTS) {
        return $resource(WORLDSKILLS_API_EVENTS + '/base_skills/:baseSkillId/tags/:baseSkillTagId', {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });

    angular.module('eventsApp').service('BaseSkillSponsor', function($resource, $http, WORLDSKILLS_API_EVENTS) {
        return $resource(WORLDSKILLS_API_EVENTS + '/base_skills/:baseSkillId/sponsors/:baseSponsorId', {
        }, {
            update: {
                method: 'PUT'
            }
        });
    });

})();
