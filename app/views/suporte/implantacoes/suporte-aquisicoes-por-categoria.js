( function() {
    'use strict';

    app.controller('SupAquisicoesPorCategoriaCtrl', SupAquisicoesPorCategoriaCtrl);

    /** @ngInject */
    function SupAquisicoesPorCategoriaCtrl($scope, $rootScope, SuporteImplantacoesService) {
        $scope.dadosAquisicoesPorCategoria = [];
        var mes = moment($rootScope.mes);

        aquisicoesPorCategoria();

        function aquisicoesPorCategoria() {
            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteImplantacoesService.getAquisicoesPorCategoria(dataInicial, dataFinal).then(
                function (response) {
                    $scope.dadosAquisicoesPorCategoria = response.data;
                }
            );
        }
    }
})();