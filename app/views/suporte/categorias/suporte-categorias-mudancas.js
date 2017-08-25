( function() {
    'use strict';

    app.controller('SupCategoriasMudancasCtrl', SupCategoriasMudancasCtrl);

    /** @ngInject */
    function SupCategoriasMudancasCtrl($scope, $rootScope, SuporteCategoriasService) {
        $scope.dadosChamadosPorCategoria = [];
        var TIPO_MUDANCAS = 39;

        var mes = moment($rootScope.mes);

        chamadosPorCategoria();

        function chamadosPorCategoria() {
            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteCategoriasService.getChamadosPorCategoria(dataInicial, dataFinal, TIPO_MUDANCAS).then(
                function (response) {
                    $scope.dadosChamadosPorCategoria = response.data;
                }
            );
        }
    }
})();