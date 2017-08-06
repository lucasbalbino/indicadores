(function () {
    'use strict';

    angular.module('app')
        .directive('indicadoresStatsSup', function () {
            return {
                templateUrl: 'js/directives/stats/stats-suporte.html',
                replace: false,
                restrict: "AE",
                scope: {
                    label: '@',
                    value: '=',
                    color: '@'
                }
            }
        });

})();
