(function() {
    'use strict';

    angular.module('app')
        .directive('indicadoresAgora', function() {
            return {
                template: '<div class="box-header"><div class="deadline">Última sincronização: {{agora}} </div></div>',
                replace: true,
                restrict: "E",
                controller: function($scope) {
                    $scope.agora = moment().locale("pt-br").format("LLLL:ss")
                }
            }
        });

})();