(function() {
    'use strict';

    angular.module('eventsApp').service('Event', function($resource, $filter, WORLDSKILLS_API_EVENTS) {

        function convertDate(data) {
            var event = angular.copy(data);
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
                event.competition_end_date = $filter('date')(event.competition_end_date, 'yyyy-MM-dd');
            }
            return angular.toJson(event);
        }

        function convertResponseDate(data) {
            if (angular.isString(data)) {
                data = angular.fromJson(data);
                data.start_date = new Date($filter('date')(data.start_date, 'medium'));
                data.end_date = new Date($filter('date')(data.end_date, 'medium'));
                if (data.competition_start_date) {
                    data.competition_start_date = new Date($filter('date')(data.competition_start_date, 'medium'));
                }
                if (data.competition_end_date) {
                    data.competition_end_date = new Date($filter('date')(data.competition_end_date, 'medium'));
                }
            }
            return data;
        }

        return $resource(WORLDSKILLS_API_EVENTS + '/:id', {
            id: '@id'
        }, {
            get: {
                method: 'GET',
                transformResponse: convertResponseDate
            },
            query: {
                method: 'GET',
                transformResponse: convertResponseDate
            },
            save: {
                method: 'POST',
                transformRequest: convertDate,
                transformResponse: convertResponseDate
            },
            update: {
                method: 'PUT',
                transformRequest: convertDate,
                transformResponse: convertResponseDate
            },
            clone: {
                method: 'POST',
                url: WORLDSKILLS_API_EVENTS + '/:id/clone',
                transformResponse: convertResponseDate
            }
        });
    });

    angular.module('eventsApp').service('EventTag', function($resource, WORLDSKILLS_API_EVENTS) {
        return $resource(WORLDSKILLS_API_EVENTS + '/:eventId/tags/:id', {
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

})();
