( function() {
    'use strict';

    app.controller('FinFaturamentoMensalPorTipoCtrl', FinFaturamentoMensalPorTipoCtrl);

    /** @ngInject */
    function FinFaturamentoMensalPorTipoCtrl($scope, $rootScope, FinanceiroFaturamentoService) {
        var gridReceitaMensal = [];
        var mes = moment($rootScope.mes);

        $scope.chartOptions = {
            currency: true
        };

        faturamentoSetupMensalidade();

        function faturamentoSetupMensalidade() {
            var dadosReceitaMensal = [];

            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.endOf('month').format('DD/MM/YYYY');

            FinanceiroFaturamentoService.getFaturamentoPorMes(dataInicial, dataFinal).then(
                function (response) {
                    gridReceitaMensal = response.data;

                    if(gridReceitaMensal.length === 1) {
                        dadosReceitaMensal.push({
                            label: "Setup",
                            value: gridReceitaMensal[0].setup
                        });
                        dadosReceitaMensal.push({
                            label: "Mensalidade",
                            value: gridReceitaMensal[0].mensalidade
                        });
                    }

                    $scope.dadosReceitaMensal = dadosReceitaMensal;
                }
            );
        }
    }
})();