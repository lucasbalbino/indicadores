( function() {
    'use strict';

    app.controller('SupChamadosPorEstadoCtrl', SupChamadosPorEstadoCtrl);

    /** @ngInject */
    function SupChamadosPorEstadoCtrl($rootScope, $http, ENV) {
        var dadosChamadosPorEstado = [];
        var mes = moment($rootScope.mes);

        chamadosPorEstado();

        function chamadosPorEstado() {
            $http.get(ENV.API_ENDPOINT + '/chamadosPorUF', {
                params: {
                    dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                    dataFinal: mes.add(1, 'month').startOf('month').format('DD/MM/YYYY')
                }
            }).then(
                function (response) {
                    dadosChamadosPorEstado = response.data;
                    graficoChamadosPorEstado().init();
                }
            );
        }

        function graficoChamadosPorEstado() {
            return {
                init: function () {
                    var map = new AmCharts.AmMap();

                    map.pathToImages = "ammap/images/";

                    map.dataProvider = dadosChamadosPorEstado;
                    map.dataProvider.map = "brazilLow";
                    map.dataProvider.getAreasFromMap = true;
                    map.validateNow();

                    var valueLegend = new AmCharts.ValueLegend();
                    valueLegend.right = 10;
                    valueLegend.showAsGradient = true;
                    map.valueLegend = valueLegend;
                    map.showObjectsAfterZoom = false;
                    map.colorSteps = 20;

                    map.areasSettings = {
                        balloonText: "[[title]] - [[value]] chamados - [[percent]]%",
                        color: "#ecf0f1",
                        colorSolid: $rootScope.colors[0],
                        selectedColor: $rootScope.colors[3],
                        autoZoom: true
                    };
                    map.fontFamily = "'Open Sans', 'Segoe UI'";

                    map.write("chamados-por-estado-map");
                }
            };
        }
    }
})();