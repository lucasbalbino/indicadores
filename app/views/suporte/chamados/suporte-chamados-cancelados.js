( function() {
    'use strict';

    app.controller('SupChamadosCanceladosCtrl', SupChamadosCanceladosCtrl);

    /** @ngInject */
    function SupChamadosCanceladosCtrl($rootScope, SuporteChamadosService) {
        var dadosChamadosCancelados = [];
        var mes = moment($rootScope.mes);

        chamadosCancelados();

        function chamadosCancelados() {
            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteChamadosService.getChamadosEncerradosECancelados(dataInicial, dataFinal).then(
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