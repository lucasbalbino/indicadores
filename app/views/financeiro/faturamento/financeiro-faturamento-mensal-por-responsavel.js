(function () {
    'use strict';

    app.controller('FinFaturamentoMensalPorResponsavelCtrl', FinFaturamentoMensalPorResponsavelCtrl);

    /** @ngInject */
    function FinFaturamentoMensalPorResponsavelCtrl($rootScope, FinanceiroFaturamentoService) {
        var QTD_RESPONSAVEL = 10;

        var dadosReceitaMensal = [];
        var gridReceitaMensal = [];
        var mes = moment($rootScope.mes);

        faturamentoResponsavel();

        function faturamentoResponsavel() {
            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.endOf('month').format('DD/MM/YYYY');

            FinanceiroFaturamentoService.getFaturamentoPorResponsavel(dataInicial, dataFinal).then(
                function (response) {
                    gridReceitaMensal = response.data;

                    for (var i = 0; i < QTD_RESPONSAVEL; i++) {
                        dadosReceitaMensal.push(gridReceitaMensal[i]);
                    }

                    graficoReceitaSetupMensalidade().init();
                }
            );
        }

        function graficoReceitaSetupMensalidade() {
            return {
                init: function () {
                    AmCharts.makeChart("faturamento-por-responsavel", {
                        "type": "pie",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": dadosReceitaMensal,
                        "valueField": "total",
                        "titleField": "responsavel",
                        "labelFunction": function (data) {
                            return data.title + ": " + currency(data.value.toFixed(2));
                        },
                        "fontSize": 12,
                        "startDuration": 1,
                        "responsive": {
                            "enabled": true
                        },
                        "balloon": {
                            "fixedPosition": true
                        },
                        "export": {
                            "enabled": true
                        }
                    });
                }
            };
        }
    }
})();