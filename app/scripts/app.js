(function() {
    'use strict';

    var eventsApp = angular.module('eventsApp', [
        'ngResource', 'ngSanitize', 'ngRoute', 'ui.bootstrap', 'ui.select2', 'pascalprecht.translate'
    ]);

    eventsApp.config(function($routeProvider) {

        $routeProvider.when('/events', {
            templateUrl: 'views/events.html',
            controller: 'EventsCtrl'
        }).when('/events/:id', {
            templateUrl: 'views/event-detail.html',
            controller: 'EventDetailCtrl',
            requireLoggedIn: true
        }).otherwise({
            redirectTo: '/events'
        });
    });

    eventsApp.config(function($translateProvider) {

        $translateProvider.useStaticFilesLoader({
            prefix: 'languages/',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('en');
        $translateProvider.fallbackLanguage('en');
    });
})();
