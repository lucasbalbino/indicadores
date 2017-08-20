(function () {
    'use strict';

    app.controller('FinEvolucaoReceitaPorMesCtrl', FinEvolucaoReceitaPorMesCtrl);

    /** @ngInject */
    function FinEvolucaoReceitaPorMesCtrl($rootScope, $scope, FinanceiroFaturamentoService) {
        var QTD_MESES = 12;
        var dadosReceita = [];

        var mes = moment($rootScope.mes);

        receitaPorMes();

        function receitaPorMes() {
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

                    graficoReceitaPorMes().init();
                    carregaEstatisticas();
                }
            );
        }

        function graficoReceitaPorMes() {
            return {
                init: function () {
                    $scope.chart = AmCharts.makeChart("evolucao-receita-por-mes", {
                        "type": "serial",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": dadosReceita,
                        "valueAxes": [{
                            "stackType": "regular",
                            "labelFunction": function (valueText, date, valueAxis) {
                                return currency(valueText.toFixed(2));
                            }
                        }],
                        "graphs": [{
                            //"balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>currency([[value]])</b></span>",
                            "balloonFunction": function (graphDataItem, graph) {
                                return "<b>Mensalidade</b><br><span style='font-size:14px'>" + graphDataItem.dataContext.mes +
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
                            "balloonFunction": function (graphDataItem, graph) {
                                return "<b>Setup</b><br><span style='font-size:14px'>" + graphDataItem.dataContext.mes +
                                    ": <b>" + currency(graphDataItem.dataContext.setup) + "</b></span>";
                            },
                            "labelText": "[[value]]",
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
                        "categoryField": "mes",
                        "legend": {
                            "markerLabelGap": 20
                        }
                    });

                    addTotal($scope.chart);

                    function addTotal(chart) {
                        // iterate through data
                        for (var i = 0; i < chart.dataProvider.length; i++) {
                            var dp = chart.dataProvider[i];
                            dp.total = 0;
                            dp.totalText = 0;
                            for (var x = 0; x < chart.graphs.length; x++) {
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
                        graph.title = "Total";
                        graph.labelText = "[[totalText]]";
                        //graph.visibleInLegend = false;
                        graph.showBalloon = false;
                        graph.lineAlpha = 0;
                        graph.fontSize = 9;
                        chart.addGraph(graph);
                    }
                }
            };
        }

        function carregaEstatisticas() {
            $scope.mesAtual = {
                nome: dadosReceita[QTD_MESES].mes,
                total: currency(dadosReceita[QTD_MESES].total.toFixed(2))
            };

            $scope.mesAnterior = {
                nome: dadosReceita[QTD_MESES - 1].mes,
                total: currency(dadosReceita[QTD_MESES - 1].total.toFixed(2)),
                porcentagem: porcentagem(dadosReceita[QTD_MESES].total, dadosReceita[QTD_MESES - 1].total.toFixed(2))
            };

            $scope.anoAnterior = {
                nome: dadosReceita[0].mes,
                total: currency(dadosReceita[0].total.toFixed(2)),
                porcentagem: porcentagem(dadosReceita[QTD_MESES].total, dadosReceita[0].total)
            };
        }
    }
})();