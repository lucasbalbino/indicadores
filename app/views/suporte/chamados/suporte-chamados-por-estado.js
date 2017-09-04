( function() {
    'use strict';

    app.controller('SupChamadosPorEstadoCtrl', SupChamadosPorEstadoCtrl);

    /** @ngInject */
    function SupChamadosPorEstadoCtrl($scope, $rootScope, SuporteChamadosService) {
        var mes = moment($rootScope.mes);

        chamadosPorEstado();

        function chamadosPorEstado() {
            var dadosChamadosPorEstadoAreas = {};

            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteChamadosService.getChamadosPorUF(dataInicial, dataFinal).then(
                function (response) {
                    dadosChamadosPorEstadoAreas = response.data;
                    $scope.dadosChamadosPorEstado = dadosChamadosPorEstadoAreas.areas;
                }
            );
        }
    }
})();