(function () {
    'use strict';

    angular.module('eventsApp').directive('focusError', function() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('submit', function() {
                    element.find('.ng-invalid').first().focus();
                });
            }
        };
    });
})();
