( function() {
    'use strict';

    app.controller('FinFaturamentoMensalPorTipoCtrl', FinFaturamentoMensalPorTipoCtrl);

    /** @ngInject */
    function FinFaturamentoMensalPorTipoCtrl($rootScope, FinanceiroFaturamentoService) {
        var dadosReceitaMensal = [];
        var gridReceitaMensal = [];
        var mes = moment($rootScope.mes);

        faturamentoSetupMensalidade();

        function faturamentoSetupMensalidade() {
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

                    graficoReceitaSetupMensalidade().init();
                }
            );
        }

        function graficoReceitaSetupMensalidade() {
            return {
                init: function () {
                    AmCharts.makeChart( "faturamento-por-tipo", {
                        "type": "pie",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": dadosReceitaMensal,
                        "valueField": "value",
                        "titleField": "label",
                        "labelFunction": function(data) {
                            return data.title + ": " + currency(data.value.toFixed(2)) + '\n(' + data.percents.toFixed(2) +"%)";
                        },
                        "fontSize": 12,
                        "startDuration": 1,
                        "responsive": {
                            "enabled": true
                        },
                        "balloon":{
                            "fixedPosition":true
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