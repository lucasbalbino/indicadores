( function() {
    'use strict';

    app.controller('SupCategoriasRequisicoesCtrl', SupCategoriasRequisicoesCtrl);

    /** @ngInject */
    function SupCategoriasRequisicoesCtrl($rootScope, SuporteCategoriasService) {
        var dadosChamadosPorCategoria = [];
        var TIPO_REQUISICOES = 33;

        var mes = moment($rootScope.mes);

        chamadosPorCategoria();

        function chamadosPorCategoria() {
            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteCategoriasService.getChamadosPorCategoria(dataInicial, dataFinal, TIPO_REQUISICOES).then(
                function (response) {
                    dadosChamadosPorCategoria = response.data;
                    graficoChamadosPorCategoria().init();
                }
            );
        }

        function graficoChamadosPorCategoria() {
            return {
                init: function () {
                    AmCharts.makeChart( "chamados-por-categoria-requisicoes", {
                        "type": "serial",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": dadosChamadosPorCategoria,
                        "valueAxes": [ {
                            "gridColor": "#FFFFFF",
                            "gridAlpha": 0.2,
                            "dashLength": 0
                        } ],
                        "gridAboveGraphs": true,
                        "startDuration": 1,
                        "graphs": [ {
                            "balloonText": "[[value]]",
                            "labelText": "[[value]]",
                            "fillAlphas": 0.8,
                            "lineAlpha": 0.2,
                            "type": "column",
                            "valueField": "quantidade"
                        } ],
                        "chartCursor": {
                            "categoryBalloonEnabled": false,
                            "cursorAlpha": 0,
                            "zoomable": false
                        },
                        "categoryField": "categoria",
                        "categoryAxis": {
                            "gridPosition": "middle",
                            "gridAlpha": 0,
                            "tickPosition": "middle",
                            "tickLength": 5
                        },
                        "rotate": true
                    });
                }
            };
        }
    }
})();