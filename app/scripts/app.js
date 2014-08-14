(function() {
    'use strict';

    var eventsApp = angular.module('eventsApp', [
        'ngResource', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'ui.select2', 'pascalprecht.translate', 'angularFileUpload', 'worldskills.utils'
    ]);

    eventsApp.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise(function ($injector, $location) {
            // check for existing redirect
            var $state = $injector.get('$state');
            var redirectToState = sessionStorage.getItem('redirect_to_state');
            var redirectToParams = sessionStorage.getItem('redirect_to_params');
            sessionStorage.removeItem('redirect_to_state');
            sessionStorage.removeItem('redirect_to_params');
            if (redirectToState) {
                if (redirectToParams) {
                    redirectToParams = angular.fromJson(redirectToParams);
                } else {
                    redirectToParams = {};
                }
                $state.go(redirectToState, redirectToParams);
            } else {
                $state.go('events.list');
            }
        });
        $stateProvider.state('events', {
            url: '/events',
            templateUrl: 'views/events.html',
            controller: 'EventsCtrl',
            abstract: true
        }).state('events.list', {
            url: '?page',
            templateUrl: 'views/events-list.html',
            controller: 'EventsListCtrl',
            data: {
                requireLoggedIn: true
            },
            reloadOnSearch: false
        }).state('event_create', {
            url: '/events/create',
            templateUrl: 'views/event-create.html',
            controller: 'EventCreateCtrl',
            abstract: true
        }).state('event_create.form', {
            url: '',
            templateUrl: 'views/event-form.html',
            controller: 'EventFormCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('events.event', {
            url: '/{id}',
            templateUrl: 'views/event.html',
            controller: 'EventCtrl',
            abstract: true
        }).state('events.event.form', {
            url: '',
            templateUrl: 'views/event-form.html',
            controller: 'EventFormCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('events.event.skills', {
            url: '/skills',
            templateUrl: 'views/event-skills.html',
            controller: 'EventSkillsCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('events.event.sponsors', {
            url: '/sponsors',
            templateUrl: 'views/event-sponsors.html',
            controller: 'EventSponsorsCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('events.sponsor_create', {
            url: '/{eventId}/sponsors/create',
            templateUrl: 'views/sponsor.html',
            controller: 'SponsorCreateCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('events.sponsor', {
            url: '/sponsors/{id}',
            templateUrl: 'views/sponsor.html',
            controller: 'SponsorCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('events.skill_create', {
            url: '/{eventId}/skills/create',
            templateUrl: 'views/skill-create.html',
            controller: 'SkillCreateCtrl',
            abstract: true
        }).state('events.skill_create.form', {
            url: '',
            templateUrl: 'views/skill-form.html',
            controller: 'SkillFormCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('events.skill', {
            url: '/skills/{id}',
            templateUrl: 'views/skill.html',
            controller: 'SkillCtrl',
            abstract: true
        }).state('events.skill.form', {
            url: '',
            templateUrl: 'views/skill-form.html',
            controller: 'SkillFormCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('events.skill.photos', {
            url: '/photos',
            templateUrl: 'views/skill-photos.html',
            controller: 'SkillPhotosCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('events.skill.translations', {
            url: '/translations',
            templateUrl: 'views/skill-translations.html',
            controller: 'SkillTranslationsCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('events.translation_create', {
            url: '/skills/{skillId}/translations/create',
            templateUrl: 'views/translation-create.html',
            controller: 'TranslationCreateCtrl',
            abstract: true
        }).state('events.translation_create.form', {
            url: '',
            templateUrl: 'views/translation-form.html',
            controller: 'TranslationFormCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('events.translation', {
            url: '/skills/{skillId}/translations/{locale}',
            templateUrl: 'views/translation.html',
            controller: 'TranslationCtrl',
            abstract: true
        }).state('events.translation.form', {
            url: '',
            templateUrl: 'views/translation-form.html',
            controller: 'TranslationFormCtrl',
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
