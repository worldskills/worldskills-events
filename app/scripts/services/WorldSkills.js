(function() {
    'use strict';

    angular.module('eventsApp').service('WorldSkills', function($resource) {
        return {
            getLink: function(links, rel) {
                var href;
                angular.forEach(links, function(link) {
                    if (link.rel == rel) {
                        href = link.href;
                    }
                });
                return href;
            }
        };
    });
})();
