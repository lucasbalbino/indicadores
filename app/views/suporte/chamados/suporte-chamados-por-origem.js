( function() {
    'use strict';

    app.controller('SupChamadosPorOrigemCtrl', SupChamadosPorOrigemCtrl);

    /** @ngInject */
    function SupChamadosPorOrigemCtrl($scope, $rootScope, SuporteChamadosService) {
        var mes = moment($rootScope.mes);

        chamadosPorOrigem();

        function chamadosPorOrigem() {
            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteChamadosService.getChamadosPorOrigem(dataInicial, dataFinal).then(
                function (response) {
                    $scope.dadosChamadosPorOrigem = response.data;
                }
            );
        }
    }
})();