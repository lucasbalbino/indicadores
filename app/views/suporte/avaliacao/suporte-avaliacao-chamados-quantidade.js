( function() {
    'use strict';

    app.controller('SupAvaliacaoQuantidadeCtrl', SupAvaliacaoQuantidadeCtrl);

    /** @ngInject */
    function SupAvaliacaoQuantidadeCtrl($scope, $rootScope, SuporteAvaliacaoService) {
        var dadosAvaliacaoQuantidade = [];
        var mes = moment($rootScope.mes);

        avaliacaoQuantidade();

        function avaliacaoQuantidade() {
            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteAvaliacaoService.getAvaliacaoChamadosQuantidade(dataInicial, dataFinal).then(
                function (response) {
                    dadosAvaliacaoQuantidade = response.data;
                    $scope.dadosAvaliacaoQuantidade = dadosAvaliacaoQuantidade;
                    // graficoAvaliacaoQuantidade().init();
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