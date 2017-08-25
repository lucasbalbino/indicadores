( function() {
    'use strict';

    app.controller('SupChamadosPorTipoCtrl', SupChamadosPorTipoCtrl);

    /** @ngInject */
    function SupChamadosPorTipoCtrl($scope, $rootScope, SuporteChamadosService) {
        $scope.dadosChamadosPorTipo = [];
        var mes = moment($rootScope.mes);

        chamadosPorTipo();

        function chamadosPorTipo() {
            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteChamadosService.getChamadosPorTipo(dataInicial, dataFinal).then(
                function (response) {
                    $scope.dadosChamadosPorTipo = response.data;
                }
            );
        }
    }
})();