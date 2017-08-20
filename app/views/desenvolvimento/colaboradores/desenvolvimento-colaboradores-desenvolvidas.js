/**
 * Created by Isaias on 09/09/2015.
 */
(function () {
    'use strict';

    app.controller('DevColaboradoresDesenvolvidasCtrl', DevColaboradoresDesenvolvidasCtrl);

    /** @ngInject */
    function DevColaboradoresDesenvolvidasCtrl($rootScope, $timeout, DesenvolvimentoColaboradoresService) {
        var atividadesResolvidasPorColaborador = [];

        $timeout(function () {
            resolvidasPorColaborador($rootScope.versao);
        }, 1500);

        function resolvidasPorColaborador(versao) {
            DesenvolvimentoColaboradoresService.getResolvidasPorColaborador(versao).then(
                function (response) {
                    atividadesResolvidasPorColaborador = response.data;
                    graficoAtividadesResolvidasPorColaborador().init();
                }
            );
        }

        function graficoAtividadesResolvidasPorColaborador() {
            return {
                init: function () {
                    AmCharts.makeChart("resolvidas-por-colaborador-chart", {
                        "type": "serial",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": atividadesResolvidasPorColaborador,
                        "graphs": [{
                            "balloonText": "[[value]]",
                            "labelText": "[[value]]",
                            "fillAlphas": 0.8,
                            "lineAlpha": 0.2,
                            "type": "column",
                            "valueField": "value"
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
                        "categoryField": "label"
                    });
                }
            };
        }
    }
})();