( function() {
    'use strict';

    app.controller('SupCategoriasRequisicoesCtrl', SupCategoriasRequisicoesCtrl);

    /** @ngInject */
    function SupCategoriasRequisicoesCtrl($scope, $rootScope, SuporteCategoriasService) {
        var TIPO_REQUISICOES = 33;

        var mes = moment($rootScope.mes);

        $scope.chartOptions = {
            value: "quantidade",
            label: "categoria"
        };

        chamadosPorCategoria();

        function chamadosPorCategoria() {
            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteCategoriasService.getChamadosPorCategoria(dataInicial, dataFinal, TIPO_REQUISICOES).then(
                function (response) {
                    $scope.dadosChamadosPorCategoria = response.data;
                }
            );
        }
    }
})();