(function() {
    'use strict';

    angular.module('app')
        .directive('indicadoresStatsDev', function() {
            return {
                templateUrl: 'js/directives/stats/stats-desenvolvimento.html',
                replace: false,
                restrict: "AE",
                scope: {
                    label: '@',
                    qtd: '=',
                    porcent: '=',
                    color: '@',
                    icon: '@'
                }
            }
        });

})();
