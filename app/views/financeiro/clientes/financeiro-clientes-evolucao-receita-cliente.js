(function () {
    'use strict';

    app.controller('FinClientesEvolucaoReceitaClienteCtrl', FinClientesEvolucaoReceitaClienteCtrl);

    /** @ngInject */
    function FinClientesEvolucaoReceitaClienteCtrl($scope, $rootScope, FinanceiroClientesService) {
        var dadosReceita = [];

        if ($rootScope.idCliente === null || $rootScope.idCliente === undefined) {
            $rootScope.idCliente = 0;
        }

        $scope.chartOptions = {
            currency: true,
            label: "mes",
            zoom: true,
            graphs: [{
                "balloonFunction": true,
                "title": "Mensalidade",
                "valueField": "mensalidade",
                "labelFunction": true
            }, {
                "balloonFunction": true,
                "title": "Setup",
                "valueField": "setup",
                "labelFunction": true
            }]
        };

        receitaPorMes();

        function receitaPorMes() {
            if ($rootScope.idCliente) {
                FinanceiroClientesService.getEvolucaoReceitaCliente($rootScope.idCliente).then(
                    function (response) {
                        dadosReceita = response.data;

                        for (var i = 0; i < dadosReceita.length; i++) {
                            dadosReceita[i].mensalidade = dadosReceita[i].mensalidade.toFixed(2);
                            dadosReceita[i].setup = dadosReceita[i].setup.toFixed(2);
                            dadosReceita[i].total = dadosReceita[i].total.toFixed(2);
                            dadosReceita[i].mes = moment(dadosReceita[i].mes, 'YYYY-MM').locale('pt-br').format("MMM/YYYY");
                        }

                        if (dadosReceita.length !== 0) {
                            $scope.dadosReceita = dadosReceita;
                        }
                    }
                );
            }
        }
    }
})();