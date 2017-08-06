( function() {
    'use strict';

    app.controller('SupImplantacoesPorCategoriaCtrl', SupImplantacoesPorCategoriaCtrl);

    SupImplantacoesPorCategoriaCtrl.$inject = ['$rootScope', '$http', 'ENV']

    function SupImplantacoesPorCategoriaCtrl($rootScope, $http, ENV) {
        var dadosImplantacoesPorCategoria = [];
        var mes = moment($rootScope.mes);

        implantacoesPorCategoria();

        function implantacoesPorCategoria() {
            $http.get(ENV.API_ENDPOINT + '/implantacoesPorCategoria', {
                params: {
                    dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                    dataFinal: mes.add(1, 'month').startOf('month').format('DD/MM/YYYY')
                }
            }).then(
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