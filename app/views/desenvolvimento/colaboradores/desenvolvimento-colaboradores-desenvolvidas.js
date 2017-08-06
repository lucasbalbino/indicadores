/**
 * Created by Isaias on 09/09/2015.
 */
(function () {
    'use strict';

    app.controller('DevColaboradoresDesenvolvidasCtrl', DevColaboradoresDesenvolvidasCtrl);

    DevColaboradoresDesenvolvidasCtrl.$inject = ['$rootScope', '$http', '$timeout', 'ENV']

    function DevColaboradoresDesenvolvidasCtrl($rootScope, $http, $timeout, ENV) {
        var atividadesResolvidasPorColaborador = [];

        $timeout(function () {
            resolvidasPorColaborador();
        }, 1500);

        function resolvidasPorColaborador() {
            $http.get(ENV.API_ENDPOINT + '/resolvidasPorColaborador', {
                params: {
                    versao: $rootScope.versao
                }
            }).then(
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