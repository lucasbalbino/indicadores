(function () {
    'use strict';

    app.controller('SupEvolucaoColaboradoresCtrl', SupEvolucaoColaboradoresCtrl);

    SupEvolucaoColaboradoresCtrl.$inject = ['$rootScope', '$scope', '$http', 'ENV']

    function SupEvolucaoColaboradoresCtrl($rootScope, $scope, $http, ENV) {
        var dadosChamadosPorColaborador = [];
        var legendaChamadosPorColaborador = [];

        $rootScope.date = {
            // 7 dias atrás
            startDate: moment().subtract(6, 'days'),
            // Hoje
            endDate: moment()
        };

        chamadosPorColaborador();

        $scope.$watch('date', function(newDate) {
            $rootScope.date = newDate;
            chamadosPorColaborador();
        }, false);

        function chamadosPorColaborador() {
            dadosChamadosPorColaborador = [];
            legendaChamadosPorColaborador = [];

            var dataFinal = moment($rootScope.date.endDate);

            $http.get(ENV.API_ENDPOINT + '/chamadosPorColaborador', {
                params: {
                    dataInicial: $rootScope.date.startDate.format('DD/MM/YYYY'),
                    dataFinal: dataFinal.add(1, 'days').format('DD/MM/YYYY')
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
                    AmCharts.makeChart( "dashboard-em-atendimento", {
                        "type": "serial",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": dadosChamadosPorColaborador,
                        "graphs": [ {
                            "balloonText": "[[value]] chamado(s) em atendimento",
                            "labelText": "[[value]]",
                            "fillAlphas": 0.8,
                            "lineAlpha": 0.2,
                            "type": "column",
                            "valueField": "qntEmAtendimento",
                            "title": "Em Atendimento"
                        },{
                            "balloonText": "[[value]] chamado(s) encerrado(s)",
                            "labelText": "[[value]]",
                            "fillAlphas": 0.8,
                            "lineAlpha": 0.2,
                            "type": "column",
                            "valueField": "qntEncerrados",
                            "title": "Encerrados"
                        } ],
                        "chartCursor": {
                            "categoryBalloonEnabled": false,
                            "cursorAlpha": 0,
                            "zoomable": false
                        },
                        "categoryAxis": {
                            "autoWrap": true
                        },
                        "startDuration": 1,
                        "categoryField": "colaborador",
                        "legend": {}
                    });
                }
            };
        }
    }
})();