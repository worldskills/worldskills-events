(function() {
    'use strict';

    var eventsApp = angular.module('eventsApp', [
        'ngResource', 'ngSanitize', 'ngMessages', 'ui.router', 'ui.bootstrap', 'pascalprecht.translate', 'angularFileUpload', 'worldskills.utils'
    ]);

    eventsApp.constant('EVENTS_APP_CODE', 400);

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
            url: '?page&sort&name&before&after&type&country&ws_entity',
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
        }).state('events.event.sectors', {
            url: '/sectors',
            templateUrl: 'views/event-sectors.html',
            controller: 'EventSectorsCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('events.event.tags', {
            url: '/tags',
            templateUrl: 'views/event-skill-tags.html',
            controller: 'EventSkillTagsCtrl',
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
            url: '/{eventId}/sponsors/create?skillId',
            templateUrl: 'views/sponsor.html',
            controller: 'SponsorCreateCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('events.sponsor', {
            url: '/sponsors/{id}?skillId',
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
            url: '/{eventId}/skills/{id}',
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
        }).state('events.skill.tags', {
            url: '/tags',
            templateUrl: 'views/skill-tags.html',
            controller: 'SkillTagsCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('events.skill.sponsors', {
            url: '/sponsors',
            templateUrl: 'views/skill-sponsors.html',
            controller: 'SkillSponsorsCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('events.skill.clone', {
            url: '/copy',
            templateUrl: 'views/skill-clone.html',
            controller: 'SkillCloneCtrl',
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
        }).state('events.skill_photo_create', {
            url: '/{eventId}/skills/{skillId}/photos/create',
            templateUrl: 'views/skill-photo.html',
            controller: 'SkillPhotoCreateCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('events.skill_photo', {
            url: '/{eventId}/skills/{skillId}/photos/{id}',
            templateUrl: 'views/skill-photo.html',
            controller: 'SkillPhotoCtrl',
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
            url: '/{eventId}/skills/{skillId}/translations/create',
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
            url: '/{eventId}/skills/{skillId}/translations/{locale}',
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
        }).state('events.sector_create', {
            url: '/{eventId}/sectors/create',
            templateUrl: 'views/sector.html',
            controller: 'SectorCreateCtrl',
            abstract: true
        }).state('events.sector_create.form', {
            url: '',
            templateUrl: 'views/sector-form.html',
            controller: 'SectorFormCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('events.sector', {
            url: '/{eventId}/sectors/{id}',
            templateUrl: 'views/sector.html',
            controller: 'SectorCtrl',
            abstract: true
        }).state('events.sector.form', {
            url: '',
            templateUrl: 'views/sector-form.html',
            controller: 'SectorFormCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('events.sector.translations', {
            url: '/translations',
            templateUrl: 'views/sector-translations.html',
            controller: 'SectorTranslationsCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('base_skills', {
            url: '/base_skills',
            templateUrl: 'views/base-skills.html',
            controller: 'BaseSkillsCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('base_skill', {
            url: '/base_skills/{id}',
            templateUrl: 'views/base-skill.html',
            controller: 'BaseSkillCtrl',
            abstract: true
        }).state('base_skill.form', {
            url: '',
            templateUrl: 'views/base-skill-form.html',
            controller: 'BaseSkillFormCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('base_skill.photos', {
            url: '/photos',
            templateUrl: 'views/base-skill-photos.html',
            controller: 'BaseSkillPhotosCtrl',
            data: {
                requireLoggedIn: true
            }
        });
    });

    eventsApp.config(function($uiViewScrollProvider) {
        $uiViewScrollProvider.useAnchorScroll();
    });

    eventsApp.config(function($translateProvider, $httpProvider) {

        $translateProvider.useSanitizeValueStrategy('sanitize');

        $translateProvider.useStaticFilesLoader({
            prefix: 'languages/',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('en');
        $translateProvider.fallbackLanguage('en');

        $httpProvider.defaults.headers.common['Accept-Language'] = 'en';
    });

    eventsApp.run(function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });
})();
