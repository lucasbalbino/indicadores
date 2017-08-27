(function () {
    'use strict';

    app.controller('FinEvolucaoReceitaAnualCrescimentoCtrl', FinEvolucaoReceitaAnualCrescimentoCtrl);

    /** @ngInject */
    function FinEvolucaoReceitaAnualCrescimentoCtrl($rootScope, $scope, FinanceiroEvolucaoService) {
        var mes = moment($rootScope.mes);

        $scope.chartOptions = {
            currency: true,
            graphs: [{
                "balloonFunction": "currency",
                "title": "Mensalidade",
                "valueField": "mensalidade",
                "labelFunction": "currency"
            }, {
                "balloonFunction": "currency",
                "title": "Setup",
                "valueField": "setup",
                "labelFunction": "currency"
            }, {
                "valueAxis": "line",
                "balloonFunction": "percentage",
                "title": "Crescimento",
                "valueField": "crescimento",
                "labelFunction": "percentage"
            }],
            categoryField: "ano",
            showAllValueLabels: true,
            legend: {
                "markerLabelGap": 20
            },
            valueAxes: [{
                "id": "columns",
                "stackType": "regular",
                "position": "left"
            }, {
                "id": "line",
                "stackType": "none",
                "position": "right"
            }]
        };

        receitaPorAno();

        function receitaPorAno() {
            var dadosReceita = [];

            FinanceiroEvolucaoService.getReceitaXCrescimento().then(
                function (response) {
                    dadosReceita = response.data;

                    for (var i = 0; i < dadosReceita.length; i++) {
                        dadosReceita[i].mensalidade = dadosReceita[i].mensalidade.toFixed(2);
                        dadosReceita[i].setup = dadosReceita[i].setup.toFixed(2);
                    }

                    $scope.dadosReceita = dadosReceita;
                }
            );
        }
    }
})();