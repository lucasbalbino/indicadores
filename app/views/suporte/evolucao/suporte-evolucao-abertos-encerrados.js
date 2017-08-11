(function () {
    'use strict';

    app.controller('SupEvolucaoAbertosEncerradosCtrl', SupEvolucaoAbertosEncerradosCtrl);

    /** @ngInject */
    function SupEvolucaoAbertosEncerradosCtrl($scope, $rootScope, SuporteEvolucaoService) {
        var dadosChamadosAbertosEncerrados;
        var gridChamadosAbertosEncerrados;

        chamadosAbertosEncerrados();

        function chamadosAbertosEncerrados() {
            dadosChamadosAbertosEncerrados = [];
            gridChamadosAbertosEncerrados = [];

            var mes = moment($rootScope.mes);

            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteEvolucaoService.getChamadosAbertosEncerrados(dataInicial, dataFinal).then(
                function (response) {
                    gridChamadosAbertosEncerrados = response.data;
                    loadDataChamadosAbertosEncerrados();
                    graficoChamadosAbertosEncerrados().init();
                }, function (response) {
                    console.log("JSON do gráfico chamadosAbertosEncerrados incorreto: " + response);
                }
            );
        }

        var loadDataChamadosAbertosEncerrados = function () {
            var mes = moment($rootScope.mes);

            $scope.totalAbertos = 0;
            $scope.totalEncerrados = 0;

            var dados = gridChamadosAbertosEncerrados;

            var datasMes = mes.range('month');

            var k = 0;
            datasMes.by('days', function(m) {
                if(k < dados.length && m.isSame(moment(dados[k].data, "DD/MM/YYYY"), 'day')) {
                    var data = moment(dados[k].data, "DD/MM/YYYY").valueOf();
                    $scope.totalAbertos += parseInt(dados[k].abertos);
                    $scope.totalEncerrados += parseInt(dados[k].encerrados);
                    dadosChamadosAbertosEncerrados.push(dados[k]);
                    k++;
                } else {
                    dadosChamadosAbertosEncerrados.push({"data": m.format("DD/MM/YYYY"),"encerrados":0,"abertos":0});
                }
            });
        };

        function graficoChamadosAbertosEncerrados() {
            return {
                init: function () {
                    AmCharts.makeChart("dashboard-abertos-encerrados", {
                        "type": "serial",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": dadosChamadosAbertosEncerrados,
                        "marginRight": 40,
                        "marginLeft": 40,
                        "autoMarginOffset": 20,
                        "dataDateFormat": "DD/MM/YYYY",
                        "valueAxes": [{
                            "id": "v1",
                            "axisAlpha": 0,
                            "position": "left",
                            "ignoreAxisWidth": true
                        }],
                        "balloon": {
                            "borderThickness": 1,
                            "shadowAlpha": 0
                        },
                        "graphs": [{
                            "id": "g1",
                            "bullet": "round",
                            "bulletBorderAlpha": 1,
                            "bulletColor": "#FFFFFF",
                            "bulletSize": 5,
                            "hideBulletsCount": 50,
                            "lineThickness": 2,
                            "title": "Abertos",
                            "useLineColorForBulletBorder": true,
                            "valueField": "abertos",
                            "balloonText": "[[value]] aberto(s)"
                        }, {
                            "id": "g2",
                            "bullet": "round",
                            "bulletBorderAlpha": 1,
                            "bulletColor": "#FFFFFF",
                            "bulletSize": 5,
                            "hideBulletsCount": 50,
                            "lineThickness": 2,
                            "title": "Encerrados",
                            "useLineColorForBulletBorder": true,
                            "valueField": "encerrados",
                            "balloonText": "[[value]] encerrado(s)"
                        }],
                        "chartCursor": {
                            "valueLineEnabled": true,
                            "valueLineBalloonEnabled": true,
                            "cursorAlpha": 1,
                            "cursorColor": "#258cbb",
                            "limitToGraph": "g1",
                            "valueLineAlpha": 0.2,
                            "categoryBalloonDateFormat": "DD/MM/YYYY"
                        },
                        "categoryField": "data",
                        "categoryAxis": {
                            "parseDates": true,
                            "dashLength": 1,
                            "minorGridEnabled": true,
                            "minorTickLength": 1,
                            "minHorizontalGap": 1,
                            "labelFunction": function (valueText, date, categoryAxis) {
                                return moment(date).format("DD");
                            }
                        },
                        "export": {
                            "enabled": true
                        },
                        "legend": {}
                    });
                }
            };
        }

    }
})();