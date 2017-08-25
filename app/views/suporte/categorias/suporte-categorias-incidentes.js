( function() {
    'use strict';

    app.controller('SupCategoriasIncidentesCtrl', SupCategoriasIncidentesCtrl);

    /** @ngInject */
    function SupCategoriasIncidentesCtrl($scope, $rootScope, SuporteCategoriasService) {
        $scope.dadosChamadosPorCategoria = [];
        var TIPO_INCIDENTES = 32;

        var mes = moment($rootScope.mes);

        chamadosPorCategoria();

        function chamadosPorCategoria() {
            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteCategoriasService.getChamadosPorCategoria(dataInicial, dataFinal, TIPO_INCIDENTES).then(
                function (response) {
                    $scope.dadosChamadosPorCategoria = response.data;
                }
            );
        }

        function graficoChamadosPorCategoria() {
            return {
                init: function () {

                }
            };
        }
    }
})();