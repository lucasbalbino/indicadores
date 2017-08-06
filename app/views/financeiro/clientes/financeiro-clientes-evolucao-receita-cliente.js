( function() {
    'use strict';

    app.controller('FinClientesEvolucaoReceitaClienteCtrl', FinClientesEvolucaoReceitaClienteCtrl);

    FinClientesEvolucaoReceitaClienteCtrl.$inject = ['$rootScope', '$http', 'ENV']

    function FinClientesEvolucaoReceitaClienteCtrl($rootScope, $http, ENV) {
        var dadosReceita = [];

        if($rootScope.idCliente == null || $rootScope.idCliente == undefined) $rootScope.idCliente = 0;

        receitaPorMes();

        function receitaPorMes() {
            if($rootScope.idCliente)
                $http.get(ENV.API_ENDPOINT + '/evolucaoReceitaCliente', {
                    params: {
                        idCliente: $rootScope.idCliente
                    }
                }).then(
                    function (response) {
                        dadosReceita = response.data;

                        for(var i=0; i<dadosReceita.length; i++) {
                            dadosReceita[i].mensalidade = dadosReceita[i].mensalidade.toFixed(2);
                            dadosReceita[i].setup = dadosReceita[i].setup.toFixed(2);
                            dadosReceita[i].total = dadosReceita[i].total.toFixed(2);
                            dadosReceita[i].mes =  moment(dadosReceita[i].mes, 'YYYY-MM').locale('pt-br').format("MMM/YYYY")
                        }

                        if(dadosReceita.length != 0)
                            graficoReceitaPorMes().init();
                    }
                );
        }

        function graficoReceitaPorMes() {
            return {
                init: function () {
                    var chart = AmCharts.makeChart( "evolucao-receita-cliente", {
                        "type": "serial",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "zoomOutText": "Mostrar Tudo",
                        "dataProvider": dadosReceita,
                        "valueAxes": [{
                            "labelFunction": function(valueText, date, valueAxis) {
                                return currency(valueText.toFixed(2));
                            }
                        }],
                        "graphs": [ {
                            "balloonFunction": function (graphDataItem, graph) {
                                return "<b>Mensalidade</b><br><span style='font-size:14px'>" + graphDataItem.dataContext.mes + ": <b>"
                                    + currency(graphDataItem.dataContext.mensalidade) + "</b></span>";
                            },
                            "labelText": "[[value]]",
                            "title": "Mensalidade",
                            "valueField": "mensalidade",
                            "labelFunction": function(graphDataItem) {
                                return currency(graphDataItem.dataContext.mensalidade);
                            }
                        },{
                            "balloonFunction": function (graphDataItem, graph) {
                                return "<b>Setup</b><br><span style='font-size:14px'>" + graphDataItem.dataContext.mes + ": <b>"
                                    + currency(graphDataItem.dataContext.setup) + "</b></span>";
                            },
                            "labelText": "[[value]]",
                            "title": "Setup",
                            "valueField": "setup",
                            "labelFunction": function(graphDataItem) {
                                return currency(graphDataItem.dataContext.setup);
                            }
                        } ],
                        "chartScrollbar": {
                            "oppositeAxis":false,
                            "offset":65,
                            "backgroundAlpha": 0,
                            "selectedBackgroundAlpha": 0.1,
                            "selectedBackgroundColor": "#888888",
                            "graphFillAlpha": 0,
                            "graphLineAlpha": 0.5,
                            "selectedGraphFillAlpha": 0,
                            "selectedGraphLineAlpha": 1,
                            "autoGridCount":true,
                            "color":"#AAAAAA"
                        },
                        "chartCursor": {
                            "categoryBalloonEnabled": true,
                            "cursorAlpha": 0,
                            "zoomable": true
                        },
                        "categoryAxis": {
                            "autoWrap": true
                        },
                        "startDuration": 1,
                        "categoryField": "mes",
                        "legend": {},
                        "export": {
                            "enabled": true
                        }
                    });

                    chart.addListener("rendered", zoomChart);

                    zoomChart();

                    function zoomChart() {
                        chart.zoomToIndexes(chart.dataProvider.length - 6, chart.dataProvider.length - 1);
                    }
                }
            };
        }
    }
})();