(function() {
    'use strict';

    var eventsApp = angular.module('eventsApp', [
        'ngResource', 'ngSanitize', 'ngRoute', 'ui.bootstrap'
    ]);

    eventsApp.config(function($routeProvider) {

        $routeProvider.when('/events', {
            templateUrl: 'views/events.html',
            controller: 'EventsCtrl'
        }).otherwise({
            redirectTo: '/events'
        });
    });
})();
