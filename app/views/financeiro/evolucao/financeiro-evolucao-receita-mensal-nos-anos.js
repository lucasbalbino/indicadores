(function () {
    'use strict';

    app.controller('FinEvolucaoReceitaMensalNosAnosCtrl', FinEvolucaoReceitaMensalNosAnosCtrl);

    FinEvolucaoReceitaMensalNosAnosCtrl.$inject = ['$rootScope', '$scope', '$http', 'ENV']

    function FinEvolucaoReceitaMensalNosAnosCtrl($rootScope, $scope, $http, ENV) {
        var MESES = 12;
        var ANOS = 3;

        var gridReceita = [];
        var dadosReceita = [];

        var legendaReceita = [];

        var mes = moment($rootScope.mes);

        receitaMensalNosAnos();

        function receitaMensalNosAnos() {
            $http.get(ENV.API_ENDPOINT + '/receitaMensalNosAnos', {
                params: {
                    dataFinal: mes.endOf('month').endOf('year').format('DD/MM/YYYY'),
                    dataInicial: mes.subtract(2, 'year').startOf('month').startOf('year').format('DD/MM/YYYY')
                }
            }).then(
                function (response) {
                    var temp = response.data;

                    for (var i = 0; i < MESES; i++) {
                        for (var j = 0; j < temp.length; j++) {
                            if (parseInt(temp[j].mes) == i + 1) {
                                gridReceita[i] = {};

                                gridReceita[i].mes = moment(temp[j].mes, 'MM').locale('pt-br').format("MMMM");

                                for (var k = 0; k < ANOS; k++) {
                                    if (temp[j]['ano' + (k + 1)]) {
                                        gridReceita[i]['ano' + (k + 1)] = {};

                                        gridReceita[i]['ano' + (k + 1)].anoMes = moment(temp[j]['ano' + (k + 1)].anoMes, 'YYYY-MM').locale('pt-br').format("MM/YYYY");
                                        gridReceita[i]['ano' + (k + 1)].mensalidade = temp[j]['ano' + (k + 1)].mensalidade.toFixed(2);
                                        gridReceita[i]['ano' + (k + 1)].setup = temp[j]['ano' + (k + 1)].setup.toFixed(2);
                                    }
                                }
                            }
                        }
                    }

                    tratarDadosReceitaNosMeses();
                    graficoReceitaAnualNosMeses().init();
                }
            );
        }

        function tratarDadosReceitaNosMeses() {
            for (var i = 0; i < gridReceita.length; i++) {
                var temp = {};

                temp.mes = gridReceita[i].mes;

                for (var k = 0; k < ANOS; k++) {
                    if (gridReceita[i]['ano' + (k + 1)]) {
                        temp['ano' + (k + 1) + '-N'] = gridReceita[i]['ano' + (k + 1)]['anoMes'];
                        temp['ano' + (k + 1) + '-M'] = gridReceita[i]['ano' + (k + 1)].mensalidade;
                        temp['ano' + (k + 1) + '-S'] = gridReceita[i]['ano' + (k + 1)].setup;
                        temp['ano' + (k + 1) + '-S'] = gridReceita[i]['ano' + (k + 1)].setup;
                    }
                }

                dadosReceita.push(temp);
            }

            for (var k = 0; k < ANOS; k++) {
                if (gridReceita[0]["ano" + (k + 1)]) {
                    legendaReceita[k] = (gridReceita[0]["ano" + (k + 1)]["anoMes"]).split("/")[1];
                } else {
                    legendaReceita[k] = (gridReceita[gridReceita.length - 1]["ano" + (k + 1)]["anoMes"]).split("/")[1];
                }
            }
        }

        function graficoReceitaAnualNosMeses() {
            return {
                init: function () {
                    $scope.chart = AmCharts.makeChart("dashboard-mensal-nos-anos", {
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
                        }],
                        "graphs": setaColunas(),
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
                            "maxColumns": 2,
                            "spacing": 100,
                            "markerLabelGap": 30
                        }
                    });
                }
            };
        }

        function setaColunas() {
            var graph = [];
            var newStack = false;

            for (var k = 0; k < ANOS; k++) {
                if(k!=0) newStack = true;

                graph.push({
                    "valueAxis": "columns",
                    "balloonFunction": function () {
                        return "";
                    },
                    "title": "Mensalidade em " + legendaReceita[k],
                    "valueField": "ano" + (k + 1) + "-M",
                    "type": "column",
                    "lineAlpha": 0.3,
                    "fillAlphas": 0.8,
                    "fontSize": 10,
                    "showAllValueLabels": true,
                    "newStack": newStack
                }, {
                    "valueAxis": "columns",
                    "balloonFunction": function (graphDataItem, graph) {
                        var k = graphDataItem.graph.valueField.substring(3, 4);
                        return graphDataItem.dataContext['ano' + k + '-N'] +
                            "<br>Mensalidade: <b>" + currency(graphDataItem.dataContext['ano' + k + '-M']) +
                            "</b><br>" + "Setup: <b>" + currency(graphDataItem.dataContext['ano' + k + '-S']) + "</b>";
                    },
                    "title": "Setup em " + legendaReceita[k],
                    "valueField": "ano" + (k + 1) + "-S",
                    "type": "column",
                    "lineAlpha": 0.3,
                    "fillAlphas": 0.8,
                    "fontSize": 10,
                    "showAllValueLabels": true
                });
            }

            return graph;
        }

    }
})();