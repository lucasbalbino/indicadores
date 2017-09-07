(function () {
    'use strict';

    app.controller('FinEvolucaoReceitaPorMesCtrl', FinEvolucaoReceitaPorMesCtrl);

    /** @ngInject */
    function FinEvolucaoReceitaPorMesCtrl($rootScope, $scope, FinanceiroFaturamentoService) {
        var QTD_MESES = 12;

        var mes = moment($rootScope.mes);

        $scope.chartOptions = {
            total: true,
            currency: true,
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
            }],
            categoryField: "mes",
            showAllValueLabels: true,
            legend: {
                "markerLabelGap": 20
            },
            valueAxes: [{
                "stackType": "regular"
            }]
        };

        receitaPorMes();

        function receitaPorMes() {
            var dadosReceita = [];
            var dataInicial = mes.subtract(QTD_MESES, 'month').startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(QTD_MESES, 'month').endOf('month').format('DD/MM/YYYY');

            FinanceiroFaturamentoService.getFaturamentoPorMes(dataInicial, dataFinal).then(
                function (response) {
                    dadosReceita = response.data;

                    for (var i = 0; i < dadosReceita.length; i++) {
                        dadosReceita[i].mensalidade = dadosReceita[i].mensalidade.toFixed(2);
                        dadosReceita[i].setup = dadosReceita[i].setup.toFixed(2);
                        dadosReceita[i].total = dadosReceita[i].total.toFixed(2);
                        dadosReceita[i].mes = moment(dadosReceita[i].mes, 'YYYY-MM').locale('pt-br').format("MMM/YYYY");
                    }

                    $scope.dadosReceita = dadosReceita;
                    carregaEstatisticas($scope.dadosReceita);
                }
            );
        }

        function carregaEstatisticas(dadosReceita) {
            $scope.mesAtual = {
                nome: dadosReceita[QTD_MESES].mes,
                total: currency(dadosReceita[QTD_MESES].total)
            };

            $scope.mesAnterior = {
                nome: dadosReceita[QTD_MESES - 1].mes,
                total: currency(dadosReceita[QTD_MESES - 1].total),
                porcentagem: porcentagem(dadosReceita[QTD_MESES].total, dadosReceita[QTD_MESES - 1].total)
            };

            $scope.anoAnterior = {
                nome: dadosReceita[0].mes,
                total: currency(dadosReceita[0].total),
                porcentagem: porcentagem(dadosReceita[QTD_MESES].total, dadosReceita[0].total)
            };
        }
    }
})();