(function () {
    'use strict';

    angular.module('app')
        .directive('indicadoresLoading', function () {
            return {
                templateUrl: 'js/directives/loading/loading.html',
                replace: false,
                restrict: "AE",
                scope: {}
            };
        });

})();