(function() {
    'use strict';

    angular.module('eventsApp').service('Event', function($resource, $filter, WORLDSKILLS_API_EVENTS) {

        function convertDate(data) {
            var event = data;
            if (angular.isDate(event.start_date)) {
                event.start_date = $filter('date')(event.start_date, 'yyyy-MM-dd');
            }
            if (angular.isDate(event.end_date)) {
                event.end_date = $filter('date')(event.end_date, 'yyyy-MM-dd');
            }
            if (angular.isDate(event.competition_start_date)) {
                event.competition_start_date = $filter('date')(event.competition_start_date, 'yyyy-MM-dd');
            }
            if (angular.isDate(event.competition_end_date)) {
                event.competition_start_date = $filter('date')(event.competition_end_date, 'yyyy-MM-dd');
            }
            return angular.toJson(event);
        }

        return $resource(WORLDSKILLS_API_EVENTS + '/:id', {
            id: '@id'
        }, {
            query: {
                method: 'GET'
            },
            save: {
                method: 'POST',
                transformRequest: convertDate
            },
            update: {
                method: 'PUT',
                transformRequest: convertDate
            },
            clone: {
                method: 'POST',
                url: WORLDSKILLS_API_EVENTS + '/:id/clone'
            }
        });
    });
})();
