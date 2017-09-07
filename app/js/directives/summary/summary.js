(function() {
    'use strict';

    angular.module('app')
        .directive('indicadoresSummary', function() {
            return {
                templateUrl: 'js/directives/summary/summary.html',
                replace: false,
                restrict: "E",
                transclude: true,
                scope: {
                    percentage: '=',
                    value: '=',
                    emoji: '=?'
                }
            };
        });

})();
