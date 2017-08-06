( function() {
    'use strict';

    app.controller('FinFaturamentoMensalPorResponsavelCtrl', FinFaturamentoMensalPorResponsavelCtrl);

    FinFaturamentoMensalPorResponsavelCtrl.$inject = ['$rootScope', '$http', 'ENV']

    function FinFaturamentoMensalPorResponsavelCtrl($rootScope, $http, ENV) {
        var QTD_RESPONSAVEL = 10;

        var dadosReceitaMensal = [];
        var gridReceitaMensal = [];
        var mes = moment($rootScope.mes);

        faturamentoResponsavel();

        function faturamentoResponsavel() {
            $http.get(ENV.API_ENDPOINT + '/faturamentoPorResponsavel', {
                params: {
                    dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                    dataFinal: mes.endOf('month').format('DD/MM/YYYY')
                }
            }).then(
                function (response) {
                    gridReceitaMensal = response.data;

                    for(var i=0; i<QTD_RESPONSAVEL; i++)
                        dadosReceitaMensal.push(gridReceitaMensal[i]);

                    graficoReceitaSetupMensalidade().init();
                }
            );
        }

        function graficoReceitaSetupMensalidade() {
            return {
                init: function () {
                    AmCharts.makeChart( "faturamento-por-responsavel", {
                        "type": "pie",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": dadosReceitaMensal,
                        "valueField": "total",
                        "titleField": "responsavel",
                        "labelFunction": function(data) {
                            return data.title + ": " + currency(data.value.toFixed(2));
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