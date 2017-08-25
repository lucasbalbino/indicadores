( function() {
    'use strict';

    app.controller('SupImplantacoesPorCategoriaCtrl', SupImplantacoesPorCategoriaCtrl);

    /** @ngInject */
    function SupImplantacoesPorCategoriaCtrl($scope, $rootScope, SuporteImplantacoesService) {
        $scope.dadosImplantacoesPorCategoria = [];
        var mes = moment($rootScope.mes);

        implantacoesPorCategoria();

        function implantacoesPorCategoria() {
            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteImplantacoesService.getImplantacoesPorCategoria(dataInicial, dataFinal).then(
                function (response) {
                    $scope.dadosImplantacoesPorCategoria = response.data;
                }
            );
        }
    }
})();