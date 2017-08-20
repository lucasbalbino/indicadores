(function () {
    'use strict';

    app.controller('DevAtividadesPorOrigemCtrl', DevAtividadesPorOrigemCtrl);

    /** @ngInject */
    function DevAtividadesPorOrigemCtrl($rootScope, DesenvolvimentoAtividadesService) {
        var dadosAtividadesPorOrigem = [];

        atividadesPorOrigem($rootScope.versao);

        function atividadesPorOrigem(versao) {
            DesenvolvimentoAtividadesService.getAtividadesEncerradasPorOrigem(versao).then(
                function (response) {
                    dadosAtividadesPorOrigem = response.data;
                    graficoAtividadesPorOrigem().init();
                }
            );
        }

        function graficoAtividadesPorOrigem() {
            return {
                init: function () {
                    return AmCharts.makeChart("atividades-por-origem-chart", {
                        "type": "pie",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": dadosAtividadesPorOrigem,
                        "valueField": "value",
                        "titleField": "label",
                        "labelText": "[[title]]: [[value]] ([[percents]]%)",
                        "fontSize": 12,
                        "responsive": {
                            "enabled": true
                        },
                        "balloon": {
                            "fixedPosition": true
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