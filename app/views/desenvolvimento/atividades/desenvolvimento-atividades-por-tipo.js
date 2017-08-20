(function () {
    'use strict';

    app.controller('DevAtividadesPorTipoCtrl', DevAtividadesPorTipoCtrl);

    /** @ngInject */
    function DevAtividadesPorTipoCtrl($rootScope, DesenvolvimentoAtividadesService) {
        var dadosAtividadesPorTipo = [];

        atividadesPorTipo($rootScope.versao);

        function atividadesPorTipo(versao) {
            DesenvolvimentoAtividadesService.getAtividadesPorTipo(versao).then(
                function (response) {
                    dadosAtividadesPorTipo = response.data;
                    graficoAtividadesPorTipo().init();
                }
            );
        }

        function graficoAtividadesPorTipo() {
            return {
                init: function () {
                    return AmCharts.makeChart( "atividades-por-tipo-chart", {
                        "type": "pie",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": dadosAtividadesPorTipo,
                        "valueField": "value",
                        "titleField": "label",
                        "labelText": "[[title]]: [[value]] ([[percents]]%)",
                        "fontSize": 12,
                        "responsive": {
                            "enabled": true
                        },
                        "balloon":{
                            "fixedPosition":true
                        },
                        "export": {
                            "enabled": true
                        },
                        "startDuration": 0
                    });
                }
            };
        }
    }

})();