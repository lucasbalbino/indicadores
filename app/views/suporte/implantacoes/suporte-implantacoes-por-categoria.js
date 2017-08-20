( function() {
    'use strict';

    app.controller('SupImplantacoesPorCategoriaCtrl', SupImplantacoesPorCategoriaCtrl);

    /** @ngInject */
    function SupImplantacoesPorCategoriaCtrl($rootScope, SuporteImplantacoesService) {
        var dadosImplantacoesPorCategoria = [];
        var mes = moment($rootScope.mes);

        implantacoesPorCategoria();

        function implantacoesPorCategoria() {
            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteImplantacoesService.getImplantacoesPorCategoria(dataInicial, dataFinal).then(
                function (response) {
                    dadosImplantacoesPorCategoria = response.data;
                    graficoImplantacoesPorCategoria().init();
                }
            );
        }

        function graficoImplantacoesPorCategoria() {
            return {
                init: function () {
					AmCharts.makeChart( "implantacoes-por-categoria-chart", {
						"type": "pie",
						"theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
						"dataProvider": dadosImplantacoesPorCategoria,
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