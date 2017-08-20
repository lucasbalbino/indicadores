( function() {
    'use strict';

    app.controller('SupChamadosPorOrigemCtrl', SupChamadosPorOrigemCtrl);

    /** @ngInject */
    function SupChamadosPorOrigemCtrl($rootScope, $http, ENV) {
        var dadosChamadosPorOrigem = [];
        var mes = moment($rootScope.mes);

        chamadosPorOrigem();

        function chamadosPorOrigem() {
            $http.get(ENV.API_ENDPOINT + '/chamadosPorOrigem', {
                params: {
                    dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                    dataFinal: mes.add(1, 'month').startOf('month').format('DD/MM/YYYY')
                }
            }).then(
                function (response) {
                    dadosChamadosPorOrigem = response.data;
                    graficoChamadosPorOrigem().init();
                }
            );
        }

        function graficoChamadosPorOrigem() {
            return {
                init: function () {
					AmCharts.makeChart( "chamados-por-origem-chart", {
						"type": "pie",
						"theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
						"dataProvider": dadosChamadosPorOrigem,
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