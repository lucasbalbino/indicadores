(function () {
    'use strict';

    app.controller('DevAtividadesPorProjetoCtrl', DevAtividadesPorProjetoCtrl);

    /** @ngInject */
    function DevAtividadesPorProjetoCtrl($rootScope, DesenvolvimentoAtividadesService) {
        var dadosAtividadesPorProjeto = [];

        atividadesPorProjeto($rootScope.versao);

        function atividadesPorProjeto(versao) {
            DesenvolvimentoAtividadesService.getAtividadesPorProjeto(versao).then(
                function (response) {
                    dadosAtividadesPorProjeto = response.data;
                    graficoAtividadesPorProjeto().init();
                }
            );
        }

        function graficoAtividadesPorProjeto() {
            return {
                init: function () {
                    return AmCharts.makeChart( "atividades-por-projeto-chart", {
                        "type": "pie",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": dadosAtividadesPorProjeto,
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