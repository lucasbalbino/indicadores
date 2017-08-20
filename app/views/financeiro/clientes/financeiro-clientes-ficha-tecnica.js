(function () {
    'use strict';

    app.controller('FinClientesFichaTecnicaCtrl', FinClientesFichaTecnicaCtrl);

    /** @ngInject */
    function FinClientesFichaTecnicaCtrl($scope, $rootScope, FinanceiroClientesService) {

        if ($rootScope.idCliente === null || $rootScope.idCliente === undefined) {
            $rootScope.idCliente = 0;
        }

        $scope.dadosCliente = {};

        dadosCliente();

        function dadosCliente() {
            FinanceiroClientesService.getFinanceiroFichaTecnica($rootScope.idCliente).then(
                function (response) {
                    var dados = response.data;

                    if (dados.length !== 0) {
                        $scope.dadosCliente = dados[0];
                    }
                }
            );
        }
    }
})();