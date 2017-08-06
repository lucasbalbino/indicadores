( function() {
    'use strict';

    app.controller('SupChamadosCanceladosCtrl', SupChamadosCanceladosCtrl);

    SupChamadosCanceladosCtrl.$inject = ['$rootScope', '$http', 'ENV']

    function SupChamadosCanceladosCtrl($rootScope, $http, ENV) {
        var dadosChamadosCancelados = [];
        var mes = moment($rootScope.mes);

        chamadosCancelados();

        function chamadosCancelados() {
            $http.get(ENV.API_ENDPOINT + '/chamadosEncerradosECancelados', {
                params: {
                    dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                    dataFinal: mes.add(1, 'month').startOf('month').format('DD/MM/YYYY')
                }
            }).then(
                function (response) {
                    dadosChamadosCancelados = response.data;
                    graficoCancelados().init();
                }
            );
        }

        function graficoCancelados() {
            return {
                init: function () {
                    AmCharts.makeChart( "chamados-cancelados-encerrados", {
                        "type": "pie",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": dadosChamadosCancelados,
                        "valueField": "value",
                        "titleField": "label",
                        "labelText": "[[title]]: [[value]] ([[percents]]%)",
                        "fontSize": 12,
                        "startDuration": 1,
                        "responsive": {
                            "enabled": true
                        },
                        "balloon":{
                            "fixedPosition":true
                        },
                        "export": {
                            "enabled": true
                        }
                    });
                }
            };
        }
    }
})();