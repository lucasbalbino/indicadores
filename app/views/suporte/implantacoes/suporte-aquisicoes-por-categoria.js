( function() {
    'use strict';

    app.controller('SupAquisicoesPorCategoriaCtrl', SupAquisicoesPorCategoriaCtrl);

    /** @ngInject */
    function SupAquisicoesPorCategoriaCtrl($rootScope, SuporteImplantacoesService) {
        var dadosAquisicoesPorCategoria = [];
        var mes = moment($rootScope.mes);

        aquisicoesPorCategoria();

        function aquisicoesPorCategoria() {
            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteImplantacoesService.getAquisicoesPorCategoria(dataInicial, dataFinal).then(
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