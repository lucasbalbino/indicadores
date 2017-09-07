(function () {
    'use strict';

    app.controller('FinEvolucaoCrescimentoAcumuladoAnualCtrl', FinEvolucaoCrescimentoAcumuladoAnualCtrl);

    /** @ngInject */
    function FinEvolucaoCrescimentoAcumuladoAnualCtrl($rootScope, $scope, FinanceiroEvolucaoService) {
        var gridReceita = [];

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

        receitaAcumuladaMes();

        function receitaAcumuladaMes() {
            var dadosReceita = [];
            var dataFinalAnoAtual = mes.endOf('month').format('DD/MM/YYYY');
            var dataFinalAnoAnterior = mes.subtract(1, 'year').endOf('month').format('DD/MM/YYYY');
            var dataInicialAnoAnterior = mes.startOf('year').format('DD/MM/YYYY');
            var dataInicialAnoAtual = mes.add(1, 'year').startOf('year').format('DD/MM/YYYY');

            FinanceiroEvolucaoService.getCrescimentoAnual(
                dataInicialAnoAnterior, dataFinalAnoAnterior, dataInicialAnoAtual, dataFinalAnoAtual
            ).then(
                function (response) {
                    gridReceita = response.data;

                    var first, last;
                    if (moment(gridReceita[0].data, "DD/MM/YYYY").isBefore(moment(gridReceita[1].data, "DD/MM/YYYY"))) {
                        first = 0;
                        last = 1;
                    } else {
                        first = 1;
                        last = 0;
                    }

                    dadosReceita.push({
                        mensalidade: gridReceita[first].mensalidade.toFixed(2),
                        setup: gridReceita[first].setup.toFixed(2),
                        total: gridReceita[first].total.toFixed(2),
                        mes: 'Janeiro-' + moment(gridReceita[first].data, "DD/MM/YYYY").locale('pt-br').format("MMMM/YYYY")
                    }, {
                        mensalidade: gridReceita[last].mensalidade.toFixed(2),
                        setup: gridReceita[last].setup.toFixed(2),
                        total: gridReceita[last].total.toFixed(2),
                        mes: 'Janeiro-' + moment(gridReceita[last].data, "DD/MM/YYYY").locale('pt-br').format("MMMM/YYYY")
                    });

                    $scope.dadosReceita = dadosReceita;
                    carregaEstatisticas(dadosReceita);
                }
            );
        }

        function carregaEstatisticas(dadosReceita) {
            $scope.crescimentoTotal = porcentagem(dadosReceita[1].total, dadosReceita[0].total);
            $scope.crescimentoSetup = porcentagem(dadosReceita[1].setup, dadosReceita[0].setup);
            $scope.crescimentoMensalidade = porcentagem(dadosReceita[1].mensalidade, dadosReceita[0].mensalidade);
        }
    }
})();