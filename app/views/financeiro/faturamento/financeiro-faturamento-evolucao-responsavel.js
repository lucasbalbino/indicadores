( function() {
    'use strict';

    app.controller('FinFaturamentoEvolucaoResponsavelCtrl', FinFaturamentoEvolucaoResponsavelCtrl);

    FinFaturamentoEvolucaoResponsavelCtrl.$inject = ['$scope', '$rootScope', '$http', 'ENV']

    function FinFaturamentoEvolucaoResponsavelCtrl($scope, $rootScope, $http, ENV) {
        var gridReceita = [];
        var dadosReceita = [];

        $scope.receitas = ['Total', 'Mensalidade', 'Setup'];
        $scope.receita = $scope.receitas[0];

        $scope.alteraForma = function(id) {
            $scope.receita = id;

            if(gridReceita.length != 0) {
                $scope.chart.clear();
                graficoReceitaPorMes($scope.receita.toLowerCase()).init();
            }
        };

        receitaPorMes($scope.receita.toLowerCase());

        function receitaPorMes(id) {
            $http.get(ENV.API_ENDPOINT + '/faturamentoEvolucaoResponsavel').then(
                function (response) {
                    gridReceita = response.data;

                    for(var i=0; i<gridReceita.length; i++) {
                        gridReceita[i].mensalidade = gridReceita[i].mensalidade.toFixed(2);
                        gridReceita[i].setup = gridReceita[i].setup.toFixed(2);
                        gridReceita[i].total = gridReceita[i].total.toFixed(2);
                        gridReceita[i].mes =  moment(gridReceita[i].mes, 'YYYY-MM').locale('pt-br').format("MMM/YYYY")
                    }


                    if(gridReceita.length != 0)
                        graficoReceitaPorMes(id).init();
                }
            );
        }

        function trataDadosReceitaPorMes(id) {
            dadosReceita = [];
            $scope.meses = [];
            $scope.responsaveis = [];
            for(var i=0; i<gridReceita.length; i++) {
                if(!$scope.meses.includes(gridReceita[i].mes))
                    $scope.meses.push(gridReceita[i].mes);
                if(!$scope.responsaveis.includes(gridReceita[i].responsavel))
                    $scope.responsaveis.push(gridReceita[i].responsavel);
            }

            $scope.responsaveis.sort();

            for(var k=0; k<$scope.meses.length; k++) {
                var dado = {};
                var tempMes = $scope.meses[k];
                dado.mes = tempMes;
                var totais = [];

                for(var j=0; j<$scope.responsaveis.length; j++) {
                    var tempResp = $scope.responsaveis[j];

                    for(var i=0; i<gridReceita.length; i++) {
                        if(gridReceita[i].mes == tempMes && gridReceita[i].responsavel == tempResp) {
                            if(id == 'total')
                                dado[id + j] = gridReceita[i].total;
                            else if(id == 'mensalidade')
                                dado[id + j] = gridReceita[i].mensalidade;
                            else if(id == 'setup')
                                dado[id + j] = gridReceita[i].setup;
                        }
                    }

                }

                dadosReceita.push(dado);
            }

            return dadosReceita;
        }

        function graficoReceitaPorMes(id) {
            return {
                init: function () {
                    $scope.chart = AmCharts.makeChart( "evolucao-receita-responsavel", {
                        "type": "serial",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "zoomOutText": "Mostrar Tudo",
                        "dataProvider": trataDadosReceitaPorMes(id),
                        "valueAxes": [{
                            "labelFunction": function(valueText, date, valueAxis) {
                                return currency(valueText.toFixed(2));
                            }
                        }],
                        "graphs": setaColunasGerentes(id),
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
                        "startDuration": 0,
                        "categoryField": "mes",
                        "legend": {},
                        "export": {
                            "enabled": true
                        }
                    });

                    $scope.chart.addListener("rendered", zoomChart);

                    zoomChart();

                    function zoomChart() {
                        $scope.chart.zoomToIndexes($scope.chart.dataProvider.length - 6, $scope.chart.dataProvider.length - 1);
                    }
                }
            };
        }

        function setaColunasGerentes(id) {
            var graph = [];
            for(var j=0; j<$scope.responsaveis.length; j++) {
                var resp = $scope.responsaveis[j];
                graph.push({
                    "balloonFunction": function (graphDataItem) {
                        var k = graphDataItem.graph.valueField.substring(id.length);
                        return "<b>" + $scope.responsaveis[k] + "</b><br><span style='font-size:14px'>" + graphDataItem.dataContext.mes + ": <b>"
                            + currency(graphDataItem.dataContext[graphDataItem.graph.valueField]) + "</b></span>";
                    },
                    "labelText": "[[value]]",
                    "title": resp,
                    "valueField": id + j,
                    "labelFunction": function (graphDataItem) {
                        return currency(graphDataItem.dataContext[graphDataItem.graph.valueField]);

                    }
                });
            }
            return graph;
        }
    }
})();