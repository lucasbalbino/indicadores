(function () {
    'use strict';

    app.controller('FinEvolucaoCrescimentoAcumuladoAnualCtrl', FinEvolucaoCrescimentoAcumuladoAnualCtrl);

    /** @ngInject */
    function FinEvolucaoCrescimentoAcumuladoAnualCtrl($rootScope, $scope, FinanceiroEvolucaoService) {
        var gridReceita = [];
        var dadosReceita = [];

        var mes = moment($rootScope.mes);

        receitaAcumuladaMes();

        function receitaAcumuladaMes() {
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

                    graficoReceitaAcumuladaMes().init();

                    carregaEstatisticas();
                }
            );
        }

        function graficoReceitaAcumuladaMes() {
            return {
                init: function () {
                    $scope.chart = AmCharts.makeChart("dashboard-crescimento-acumulado", {
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
                            "balloonFunction": function (graphDataItem, graph) {
                                return "<b>Mensalidade</b><br><span style='font-size:14px'>" + graphDataItem.dataContext.mes + ": <b>" +
                                    currency(graphDataItem.dataContext.mensalidade) + "</b></span>";
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
                                return "<b>Setup</b><br><span style='font-size:14px'>" + graphDataItem.dataContext.mes + ": <b>" +
                                    currency(graphDataItem.dataContext.setup) + "</b></span>";
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

        function carregaEstatisticas() {
            $scope.crescimentoTotal = porcentagem(dadosReceita[1].total, dadosReceita[0].total);
            $scope.crescimentoSetup = porcentagem(dadosReceita[1].setup, dadosReceita[0].setup);
            $scope.crescimentoMensalidade = porcentagem(dadosReceita[1].mensalidade, dadosReceita[0].mensalidade);
        }
    }
})();