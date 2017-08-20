( function() {
    'use strict';

    app.controller('SupChamadosPorTipoCtrl', SupChamadosPorTipoCtrl);

    /** @ngInject */
    function SupChamadosPorTipoCtrl($rootScope, $http, ENV) {
        var dadosChamadosPorTipo = [];
        var mes = moment($rootScope.mes);

        chamadosPorTipo();

        function chamadosPorTipo() {
            $http.get(ENV.API_ENDPOINT + '/chamadosPorTipo', {
                params: {
                    dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                    dataFinal: mes.add(1, 'month').startOf('month').format('DD/MM/YYYY')
                }
            }).then(
                function (response) {
                    dadosChamadosPorTipo = response.data;
                    graficoChamadosPorTipo().init();
                }
            );
        }

        function graficoChamadosPorTipo() {
            return {
                init: function () {
					AmCharts.makeChart( "chamados-por-tipo-chart", {
						"type": "pie",
						"theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
						"dataProvider": dadosChamadosPorTipo,
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