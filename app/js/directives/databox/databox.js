(function() {
    'use strict';

    angular.module('app')
        .directive('indicadoresDatabox', function() {
            return {
                templateUrl: 'js/directives/databox/databox.html',
                replace: false,
                restrict: "E",
                transclude: true,
                scope: {
                    ngController: '=',
                    label: '@',
                    class: '@',
                    function: '&?'
                }
            }
        });

})();
