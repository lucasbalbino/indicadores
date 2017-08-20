( function() {
    'use strict';

    app.controller('SupChamadosSuspensosMotivoCtrl', SupChamadosSuspensosMotivoCtrl);

    /** @ngInject */
    function SupChamadosSuspensosMotivoCtrl($rootScope, $http, ENV) {
        var dadosChamadosSuspensos = [];
        var mes = moment($rootScope.mes);

        chamadosSuspensosMotivo();

        function chamadosSuspensosMotivo() {
            $http.get(ENV.API_ENDPOINT + '/chamadosPorSuspensao').then(
                function (response) {
                    dadosChamadosSuspensos = response.data;
                    graficoChamadosSuspensos().init();
                }
            );
        }

        function graficoChamadosSuspensos() {
            return {
                init: function () {
                    AmCharts.makeChart( "chamados-suspensos-motivo", {
                        "type": "pie",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": dadosChamadosSuspensos,
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