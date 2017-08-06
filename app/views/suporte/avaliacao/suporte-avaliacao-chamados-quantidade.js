( function() {
    'use strict';

    app.controller('SupAvaliacaoQuantidadeCtrl', SupAvaliacaoQuantidadeCtrl);

    SupAvaliacaoQuantidadeCtrl.$inject = ['$rootScope', '$http', 'ENV']

    function SupAvaliacaoQuantidadeCtrl($rootScope, $http, ENV) {
        var dadosAvaliacaoQuantidade = [];
        var mes = moment($rootScope.mes);

        avaliacaoQuantidade();

        function avaliacaoQuantidade() {
            $http.get(ENV.API_ENDPOINT + '/avaliacaoChamadosQuantidade', {
                params: {
                    dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                    dataFinal: mes.add(1, 'month').startOf('month').format('DD/MM/YYYY')
                }
            }).then(
                function (response) {
                    dadosAvaliacaoQuantidade = response.data;
                    graficoAvaliacaoQuantidade().init();
                }
            );
        }

        function graficoAvaliacaoQuantidade() {
            return {
                init: function () {
					AmCharts.makeChart( "avaliacao-quantidade-chart", {
						"type": "pie",
						"theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
						"dataProvider": dadosAvaliacaoQuantidade,
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