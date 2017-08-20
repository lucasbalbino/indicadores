(function () {
    'use strict';

    app.controller('ComClientesChamadosPorTipoCtrl', ComClientesChamadosPorTipoCtrl);

    /** @ngInject */
    function ComClientesChamadosPorTipoCtrl($scope, $rootScope, SuporteEvolucaoService) {
        var QTD_MESES = 6;

        var dadosTemp = [];
        var dadosChamadosPorTipo = [];
        var gridChamadosPorTipo = [];

        if ($rootScope.idCliente === null || $rootScope.idCliente === undefined) {
            $rootScope.idCliente = 0;
        }

        carregaChamadosPorTipo(function () {
            if ($rootScope.idCliente !== 0) {
                loadDataChamadosPorTipo();
                graficoChamadosPorTipo().init();
            }
        });

        function carregaChamadosPorTipo(callback1) {
            var mes = moment().subtract(QTD_MESES, 'months');
            var dataTemp = moment().subtract(QTD_MESES, 'months');

            var setaValoresChamados = function (n, callback2) {
                dadosTemp = 0;
                chamadosPorTipoIdCliente(dataTemp.startOf('month').format('DD/MM/YYYY'), dataTemp.startOf('month').add(1, 'month').format('DD/MM/YYYY'), function () {

                    gridChamadosPorTipo.push({
                        mes: mes.locale('pt-br').format("MMM/YYYY"),
                        dados: dadosTemp
                    });

                    mes = mes.add(1, 'month');

                    if (n < QTD_MESES) {
                        setaValoresChamados(n + 1, callback2);
                    }
                });

                if (n === QTD_MESES) {
                    callback2();
                }
            };

            setaValoresChamados(0, function () {
                callback1();
            });
        }

        function chamadosPorTipoIdCliente(dataInicial, dataFinal, callback) {
            SuporteEvolucaoService.getChamadosPorTipo(dataInicial, dataFinal, $rootScope.idCliente).then(
                function (response) {
                    dadosTemp = response.data;
                    callback();
                }
            );
        }

        function loadDataChamadosPorTipo() {
            var data = gridChamadosPorTipo;
            var dado = {};

            for (var i = 0; i < data.length; i++) {
                dado = {};
                dado.mes = data[i].mes;
                for (var j = 0; j < data[i].dados.length; j++) {
                    if (data[i].dados[j].label === "Incidente") {
                        dado.incidentes = data[i].dados[j].value;
                    }
                    if (data[i].dados[j].label === "Requisição") {
                        dado.requisicoes = data[i].dados[j].value;
                    }
                    if (data[i].dados[j].label === "Mudança") {
                        dado.mudancas = data[i].dados[j].value;
                    }
                    if (data[i].dados[j].label === "Não Classificado" || data[i].dados[j].label === "[Depreciado]") {
                        dado.outros = data[i].dados[j].value;
                    }
                }
                dadosChamadosPorTipo.push(dado);
            }
        }

        function graficoChamadosPorTipo() {
            return {
                init: function () {
                    $scope.chart = AmCharts.makeChart("dashboard-chamados-por-tipo", {
                        "type": "serial",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": dadosChamadosPorTipo,
                        "valueAxes": [{
                            "stackType": "regular",
                        }],
                        "graphs": [{
                            "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                            "labelText": "[[value]]",
                            "title": "Incidentes",
                            "valueField": "incidentes",
                            "type": "column",
                            "lineAlpha": 0.3,
                            "fillAlphas": 0.8
                        }, {
                            "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                            "labelText": "[[value]]",
                            "title": "Requisições",
                            "valueField": "requisicoes",
                            "type": "column",
                            "lineAlpha": 0.3,
                            "fillAlphas": 0.8
                        }, {
                            "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                            "labelText": "[[value]]",
                            "title": "Mudanças",
                            "valueField": "mudancas",
                            "type": "column",
                            "lineAlpha": 0.3,
                            "fillAlphas": 0.8
                        }, {
                            "balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
                            "labelText": "[[value]]",
                            "title": "Outros",
                            "valueField": "outros",
                            "type": "column",
                            "lineAlpha": 0.3,
                            "fillAlphas": 0.8
                        }],
                        "startDuration": 1,
                        "categoryField": "mes",
                        "export": {
                            "enabled": true
                        },
                        "legend": {}
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
                                    dp.totalText += dp[g.valueField];
                                    if (dp[g.valueField] > 0) {
                                        dp.total += dp[g.valueField];
                                    }
                                }
                            }
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
    }
})();