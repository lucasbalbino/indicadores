( function() {
    'use strict';

    app.controller('SupChamadosPorPrioridadeCtrl', SupChamadosPorPrioridadeCtrl);

    /** @ngInject */
    function SupChamadosPorPrioridadeCtrl($rootScope, $http, ENV) {
        var dadosChamadosPorPrioridade = [];
        var mes = moment($rootScope.mes);

        chamadosPorPrioridade();

        function chamadosPorPrioridade() {
            $http.get(ENV.API_ENDPOINT + '/chamadosPorPrioridade', {
                params: {
                    dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                    dataFinal: mes.add(1, 'month').startOf('month').format('DD/MM/YYYY')
                }
            }).then(
                function (response) {
                    dadosChamadosPorPrioridade = trataOrdemPrioridades(response.data);
                    graficoChamadosPorPrioridade().init();
                }
            );
        }

        function graficoChamadosPorPrioridade() {
            return {
                init: function () {
					AmCharts.makeChart( "chamados-por-prioridade-chart", {
						"type": "serial",
						"theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
						"dataProvider": dadosChamadosPorPrioridade,
                        "graphs": [ {
                            "balloonText": "[[value]]",
                            "labelText": "[[value]]",
                            "fillAlphas": 0.8,
                            "lineAlpha": 0.2,
                            "type": "column",
                            "valueField": "value"
                        } ],
                        "chartCursor": {
                            "categoryBalloonEnabled": false,
                            "cursorAlpha": 0,
                            "zoomable": false
                        },
                        "startDuration": 1,
						"categoryField": "label"
					});
                }
            };
        }

        function trataOrdemPrioridades(d) {
            var dados = [];

            // Prioridades do chamado ordenadas
            for (var i = 0; i < d.length; i++) if (d[i].label == "Crítico") dados.push(d[i]);
            for (var i = 0; i < d.length; i++) if (d[i].label == "Alto") dados.push(d[i]);
            for (var i = 0; i < d.length; i++) if (d[i].label == "Médio") dados.push(d[i]);
            for (var i = 0; i < d.length; i++) if (d[i].label == "Baixo") dados.push(d[i]);
            for (var i = 0; i < d.length; i++) if (d[i].label == "Planejado") dados.push(d[i]);

            return dados;
        }
    }
})();