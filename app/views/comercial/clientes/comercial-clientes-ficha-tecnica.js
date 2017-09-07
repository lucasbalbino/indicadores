(function () {
    'use strict';

    app.controller('ComClientesFichaTecnicaCtrl', ComClientesFichaTecnicaCtrl);

    /** @ngInject */
    function ComClientesFichaTecnicaCtrl($scope, $rootScope, ComercialClientesService) {


        $scope.dadosCliente = {};

        dadosCliente();

        function dadosCliente() {
            ComercialClientesService.getDadosCliente($rootScope.idCliente).then(
                function (response) {
                    var dados = response.data;

                    if (dados.length !== 0) {
                        $scope.dadosCliente = dados[0];

                        $scope.dadosCliente.link = "http://LINK?dados=" + $rootScope.idCliente;
                    }
                }
            );
        }
    }
})();