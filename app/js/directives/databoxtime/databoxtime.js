(function() {
    'use strict';

    angular.module('app')
        .directive('indicadoresDataboxTime', function() {
            return {
                templateUrl: 'js/directives/databoxtime/databoxtime.html',
                replace: false,
                restrict: "E",
                transclude: true,
                scope: {
                    ngController: '=',
                    class: '@'
                }
            }
        });

})();
