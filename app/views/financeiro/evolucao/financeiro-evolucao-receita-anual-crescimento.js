(function () {
    'use strict';

    app.controller('FinEvolucaoReceitaAnualCrescimentoCtrl', FinEvolucaoReceitaAnualCrescimentoCtrl);

    /** @ngInject */
    function FinEvolucaoReceitaAnualCrescimentoCtrl($rootScope, $scope, FinanceiroEvolucaoService) {
        var dadosReceita = [];

        var mes = moment($rootScope.mes);

        receitaPorAno();

        function receitaPorAno() {
            FinanceiroEvolucaoService.getReceitaXCrescimento().then(
                function (response) {
                    dadosReceita = response.data;

                    for (var i = 0; i < dadosReceita.length; i++) {
                        dadosReceita[i].mensalidade = dadosReceita[i].mensalidade.toFixed(2);
                        dadosReceita[i].setup = dadosReceita[i].setup.toFixed(2);
                    }

                    graficoReceitaPorAno().init();
                }
            );
        }

        function graficoReceitaPorAno() {
            return {
                init: function () {
                    $scope.chart = AmCharts.makeChart("dashboard-receita-crescimento", {
                        "type": "serial",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": dadosReceita,
                        "valueAxes": [{
                            "id": "column",
                            "stackType": "regular",
                            "position": "left",
                            "labelFunction": function (valueText, date, valueAxis) {
                                return currency(valueText.toFixed(2));
                            }
                        }, {
                            "id": "line",
                            "stackType": "none",
                            "position": "right",
                            "labelFunction": function (valueText, date, valueAxis) {
                                return valueText + '%';
                            }
                        }],
                        "graphs": [{
                            "valueAxis": "columns",
                            "balloonFunction": function (graphDataItem, graph) {
                                return "<b>Mensalidade</b><br><span style='font-size:14px'>" + graphDataItem.dataContext.ano +
                                    ": <b>" + currency(graphDataItem.dataContext.mensalidade) + "</b></span>";
                            },
                            "labelText": "[[value]]",
                            "title": "Mensalidade",
                            "valueField": "mensalidade",
                            "type": "column",
                            "lineAlpha": 0.3,
                            "fillAlphas": 0.8,
                            "fontSize": 10,
                            "labelFunction": function (graphDataItem) {
                                return currency(graphDataItem.dataContext.mensalidade);
                            },
                            "showAllValueLabels": true
                        }, {
                            "valueAxis": "columns",
                            "balloonFunction": function (graphDataItem, graph) {
                                return "<b>Setup</b><br><span style='font-size:14px'>" + graphDataItem.dataContext.ano +
                                    ": <b>" + currency(graphDataItem.dataContext.setup) + "</b></span>";
                            },
                            "labelText": "[[value]]%",
                            "title": "Setup",
                            "valueField": "setup",
                            "type": "column",
                            "lineAlpha": 0.3,
                            "fillAlphas": 0.8,
                            "fontSize": 10,
                            "labelFunction": function (graphDataItem) {
                                return currency(graphDataItem.dataContext.setup);
                            },
                            "showAllValueLabels": true
                        }, {
                            "valueAxis": "line",
                            "balloonFunction": function (graphDataItem, graph) {
                                return "<b>Crescimento</b><br><span style='font-size:14px'>" +
                                    (parseInt(graphDataItem.dataContext.ano) - 1) + "-" + graphDataItem.dataContext.ano +
                                    ": <b>" + graphDataItem.dataContext.crescimento + "%</b></span>";
                            },
                            "labelText": "[[value]]",
                            "title": "Crescimento",
                            "valueField": "crescimento",
                            "labelFunction": function (graphDataItem) {
                                return graphDataItem.dataContext.crescimento + '%';
                            },
                            "showAllValueLabels": true
                        }],
                        "chartCursor": {
                            "categoryBalloonEnabled": false,
                            "cursorAlpha": 0,
                            "zoomable": false
                        },
                        "categoryAxis": {
                            "autoWrap": true
                        },
                        "startDuration": 1,
                        "categoryField": "ano",
                        "legend": {}
                    });

                    addTotal($scope.chart);

                    function addTotal(chart) {
                        // iterate through data
                        for (var i = 0; i < chart.dataProvider.length; i++) {
                            var dp = chart.dataProvider[i];
                            dp.total = 0;
                            dp.totalText = 0;
                            for (var x = 0; x < chart.graphs.length - 1; x++) {
                                var g = chart.graphs[x];
                                if (dp[g.valueField]) {
                                    dp.totalText += parseFloat(dp[g.valueField]);
                                    if (dp[g.valueField] > 0) {
                                        dp.total += parseFloat(dp[g.valueField]);
                                    }
                                }
                            }
                            dp.totalText = currency(dp.totalText.toFixed(2));
                        }

                        // add additional graph
                        var graph = new AmCharts.AmGraph();
                        graph.valueField = "total";
                        graph.labelText = "[[totalText]]";
                        graph.visibleInLegend = false;
                        graph.showBalloon = false;
                        graph.lineAlpha = 0;
                        graph.fontSize = 9;
                        chart.addGraph(graph);
                    }
                }
            };
        }
    }
})();