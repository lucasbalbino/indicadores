( function() {
    'use strict';

    app.controller('SupAquisicoesPorCategoriaCtrl', SupAquisicoesPorCategoriaCtrl);

    SupAquisicoesPorCategoriaCtrl.$inject = ['$rootScope', '$http', 'ENV']

    function SupAquisicoesPorCategoriaCtrl($rootScope, $http, ENV) {
        var dadosAquisicoesPorCategoria = [];
        var mes = moment($rootScope.mes);

        aquisicoesPorCategoria();

        function aquisicoesPorCategoria() {
            $http.get(ENV.API_ENDPOINT + '/aquisicoesPorCategoria', {
                params: {
                    dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                    dataFinal: mes.add(1, 'month').startOf('month').format('DD/MM/YYYY')
                }
            }).then(
                function (response) {
                    dadosAquisicoesPorCategoria = response.data;
                    graficoAquisicoesPorCategoria().init();
                }
            );
        }

        function graficoAquisicoesPorCategoria() {
            return {
                init: function () {
					AmCharts.makeChart( "aquisicoes-por-categoria-chart", {
						"type": "pie",
						"theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
						"dataProvider": dadosAquisicoesPorCategoria,
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
						}
					});
                }
            };
        }
    }
})();