( function() {
    'use strict';

    app.controller('SupColaboradoresCtrl', SupColaboradoresCtrl);

    SupColaboradoresCtrl.$inject = ['$rootScope', '$http', 'ENV']

    function SupColaboradoresCtrl($rootScope, $http, ENV) {
        var dadosChamadosPorColaborador;

        chamadosPorColaborador();

        function chamadosPorColaborador() {
            dadosChamadosPorColaborador = [];

            var mes = moment($rootScope.mes);

            $http.get(ENV.API_ENDPOINT + '/chamadosPorColaborador', {
                params: {
                    dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                    dataFinal: mes.add(1, 'month').startOf('month').format('DD/MM/YYYY')
                }
            }).then(
                function (response) {
                    dadosChamadosPorColaborador = response.data;
                    graficoChamadosPorColaborador().init();
                }
            );
        }

        function graficoChamadosPorColaborador() {
            return {
                init: function () {
                    AmCharts.makeChart( "dashboard-resolvidas-chart-realtime", {
                        "type": "serial",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": dadosChamadosPorColaborador,
                        "graphs": [{
                            "balloonText": "[[value]] chamado(s)",
                            "labelText": "[[value]]",
                            "fillAlphas": 0.8,
                            "lineAlpha": 0.2,
                            "type": "column",
                            "valueField": "qntEncerrados",
                            "title": "Encerrados"
                        } ],
                        "categoryAxis": {
                            "autoWrap": true
                        },
                        "startDuration": 1,
                        "categoryField": "colaborador"
                    });
                }
            };
        }
    }
})();