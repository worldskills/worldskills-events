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

    angular.module('eventsApp').directive('convertToNumber', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(val) {
                    return parseInt(val, 10);
                });
                ngModel.$formatters.push(function(val) {
                    return '' + val;
                });
            }
        };
    });
})();
