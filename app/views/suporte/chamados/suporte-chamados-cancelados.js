( function() {
    'use strict';

    app.controller('SupChamadosCanceladosCtrl', SupChamadosCanceladosCtrl);

    /** @ngInject */
    function SupChamadosCanceladosCtrl($scope, $rootScope, SuporteChamadosService) {
        var mes = moment($rootScope.mes);

        chamadosCancelados();

        function chamadosCancelados() {
            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteChamadosService.getChamadosEncerradosECancelados(dataInicial, dataFinal).then(
                function (response) {
                    $scope.dadosChamadosCancelados = response.data;
                }
            );
        }
    }
})();