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
            templateUrl: 'views/event-create.html',
            controller: 'EventCreateCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('event', {
            url: '/events/{id}',
            templateUrl: 'views/event.html',
            controller: 'EventCtrl',
            abstract: true,
        }).state('event.detail', {
            url: '',
            templateUrl: 'views/event-detail.html',
            controller: 'EventDetailCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('event.skills', {
            url: '/skills',
            templateUrl: 'views/event-skills.html',
            data: {
                requireLoggedIn: true
            }
        }).state('event.sponsors', {
            url: '/sponsors',
            templateUrl: 'views/event-sponsors.html',
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
