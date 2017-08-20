/**
 * Created by Isaias on 09/09/2015.
 */
(function () {
    'use strict';

    app.controller('DevColaboradoresTestadasCtrl', DevColaboradoresTestadasCtrl);

    /** @ngInject */
    function DevColaboradoresTestadasCtrl($rootScope, $timeout, DesenvolvimentoColaboradoresService) {
        var atividadesTestadasPorColaborador = [];

        $timeout(function () {
            testadasPorColaborador($rootScope.versao);
        }, 1500);

        function testadasPorColaborador(versao) {
            DesenvolvimentoColaboradoresService.getTestadasPorColaborador(versao).then(
                function (response) {
                    atividadesTestadasPorColaborador = response.data;
                    graficoAtividadesTestadasPorColaborador().init();
                }
            );
        }

        function graficoAtividadesTestadasPorColaborador() {
            return {
                init: function () {
                    AmCharts.makeChart("testadas-por-colaborador-chart", {
                        "type": "serial",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": atividadesTestadasPorColaborador,
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