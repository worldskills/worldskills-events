(function() {
    'use strict';

    var eventsApp = angular.module('eventsApp', [
        'ngResource', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'ui.select2', 'pascalprecht.translate'
    ]);

    eventsApp.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/events');
        $stateProvider.state('events', {
            url: '/events?page',
            templateUrl: 'views/events.html',
            controller: 'EventsCtrl',
            reloadOnSearch: false
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
            controller: 'EventSkillsCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('event.sponsors', {
            url: '/sponsors',
            templateUrl: 'views/event-sponsors.html',
            controller: 'EventSponsorsCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('sponsor_create', {
            url: '/events/{eventId}/sponsors/create',
            templateUrl: 'views/sponsor.html',
            controller: 'SponsorCreateCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('sponsor', {
            url: '/sponsors/{id}',
            templateUrl: 'views/sponsor.html',
            controller: 'SponsorCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('skill_create', {
            url: '/events/{eventId}/skills/create',
            templateUrl: 'views/skill.html',
            controller: 'SkillCreateCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('skill', {
            url: '/skills/{id}',
            templateUrl: 'views/skill.html',
            controller: 'SkillCtrl',
            data: {
                requireLoggedIn: true
            }
        });
    });

    eventsApp.config(function($uiViewScrollProvider) {
        $uiViewScrollProvider.useAnchorScroll();
    });

    eventsApp.config(function($translateProvider) {

        $translateProvider.useStaticFilesLoader({
            prefix: 'languages/',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('en');
        $translateProvider.fallbackLanguage('en');
    });
    
    eventsApp.run(function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });
})();
