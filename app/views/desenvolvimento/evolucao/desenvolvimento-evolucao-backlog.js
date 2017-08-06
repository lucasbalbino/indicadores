(function () {
    'use strict';

    app.controller('DevEvolucaoBacklogCtrl', DevEvolucaoBacklogCtrl);

    DevEvolucaoBacklogCtrl.$inject = ['$rootScope', '$http', '$timeout', 'ENV']

    function DevEvolucaoBacklogCtrl($rootScope, $http, $timeout, ENV) {
        var dadosEvolucaoBacklog = [];

        $timeout(function () {
            evolucaoBacklog();
        }, 1500);

        function evolucaoBacklog() {
            dadosEvolucaoBacklog = [];

            $http.get(ENV.API_ENDPOINT + '/evolucaoBacklogDesenvolvimento').then(
                function (response) {
                    dadosEvolucaoBacklog = response.data;
                    graficoEvolucaoBacklog().init();
                }, function (response) {
                    console.log("JSON do gráfico evolucaoBacklog incorreto");
                }
            );
        }

        function graficoEvolucaoBacklog() {
            return {
                init: function () {
                    var chart = AmCharts.makeChart("evolucao-backlog-chart", {
                        "type": "serial",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "zoomOutText": "Mostrar Tudo",
                        "dataProvider": dadosEvolucaoBacklog,
                        "marginRight": 40,
                        "marginLeft": 40,
                        "autoMarginOffset": 20,
                        "dataDateFormat": "DD-MM-YYYY",
                        "valueAxes": [{
                            "axisAlpha": 0,
                            "position": "left"
                        }],
                        "balloon": {
                            "borderThickness": 1,
                            "shadowAlpha": 0
                        },
                        "graphs": [{
                            "valueField": "quantidade",
                            "labelText": "[[value]]",
                            "balloonText": "Versão: <b>[[versao]]</b><br>[[value]] atividades no backlog"
                        }],
                        "chartScrollbar": {
                            "oppositeAxis": false,
                            "offset": 30,
                            "backgroundAlpha": 0,
                            "selectedBackgroundAlpha": 0.1,
                            "selectedBackgroundColor": "#888888",
                            "graphFillAlpha": 0,
                            "graphLineAlpha": 0.5,
                            "selectedGraphFillAlpha": 0,
                            "selectedGraphLineAlpha": 1,
                            "autoGridCount": true,
                            "color": "#AAAAAA",
                            "labelFunction": function (valueText, date, categoryAxis) {
                                return moment(date).locale('pt-br').format("DD/MMM");
                            }
                        },
                        "chartCursor": {
                            "bulletSize": 5,
                            "cursorAlpha": 1,
                            "cursorColor": "#258cbb",
                            "valueLineAlpha": 0.2,
                            "categoryBalloonDateFormat": "DD/MM/YYYY"
                        },
                        "categoryField": "dataFinal",
                        "categoryAxis": {
                            "parseDates": true,
                            "dashLength": 1,
                            "minorGridEnabled": true,
                            "labelFunction": function (valueText, date, categoryAxis) {
                                return moment(date).locale('pt-br').format("DD/MMM");
                            }
                        },
                        "export": {
                            "enabled": true
                        }
                    });

                    chart.addListener("rendered", zoomChart);

                    zoomChart();

                    function zoomChart() {
                        chart.zoomToIndexes(chart.dataProvider.length - 12, chart.dataProvider.length - 1);
                    }
                }
            };
        }
    }
})();