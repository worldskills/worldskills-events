(function() {
    'use strict';

    var eventsApp = angular.module('eventsApp', [
        'ngResource', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'ui.select2', 'pascalprecht.translate'
    ]);

    eventsApp.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/events');
        $stateProvider.state('events', {
            url: '/events',
            templateUrl: 'views/events.html',
            controller: 'EventsCtrl'
        }).state('event_create', {
            url: '/events/create',
            templateUrl: 'views/event-detail.html',
            controller: 'EventCreateCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('event', {
            url: '/events/{id}',
            templateUrl: 'views/event-detail.html',
            controller: 'EventDetailCtrl',
            data: {
                requireLoggedIn: true
            }
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
