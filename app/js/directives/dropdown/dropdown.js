(function() {
    'use strict';

    angular.module('app')
    .directive('indicadoresDropdown', function() {
        return {
            templateUrl: 'js/directives/dropdown/dropdown.html',
            replace: false,
            restrict: "AE",
            scope: {
                label: '@',
                itens: '=',
                item: '=',
                acao: '&'
            }
        }
    });

})();