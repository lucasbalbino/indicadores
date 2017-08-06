( function() {
    'use strict';

    app.controller('FinFaturamentoMensalPorTipoCtrl', FinFaturamentoMensalPorTipoCtrl);

    FinFaturamentoMensalPorTipoCtrl.$inject = ['$rootScope', '$http', 'ENV']

    function FinFaturamentoMensalPorTipoCtrl($rootScope, $http, ENV) {
        var dadosReceitaMensal = [];
        var gridReceitaMensal = [];
        var mes = moment($rootScope.mes);

        faturamentoSetupMensalidade();

        function faturamentoSetupMensalidade() {
            $http.get(ENV.API_ENDPOINT + '/faturamentoOobjPorMes', {
                params: {
                    dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                    dataFinal: mes.endOf('month').format('DD/MM/YYYY')
                }
            }).then(
                function (response) {
                    gridReceitaMensal = response.data;

                    if(gridReceitaMensal.length == 1) {
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