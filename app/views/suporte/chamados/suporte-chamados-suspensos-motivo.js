( function() {
    'use strict';

    app.controller('SupChamadosSuspensosMotivoCtrl', SupChamadosSuspensosMotivoCtrl);

    /** @ngInject */
    function SupChamadosSuspensosMotivoCtrl($scope, $rootScope, SuporteChamadosService) {
        var mes = moment($rootScope.mes);

        chamadosSuspensosMotivo();

        function chamadosSuspensosMotivo() {
            SuporteChamadosService.getChamadosPorSuspensao().then(
                function (response) {
                    $scope.dadosChamadosSuspensos = response.data;
                }
            );
        }
    }
})();