( function() {
    'use strict';

    app.controller('SupAvaliacaoChamadosCtrl', SupAvaliacaoChamadosCtrl);

    SupAvaliacaoChamadosCtrl.$inject = ['$rootScope', '$http', 'ENV']

    function SupAvaliacaoChamadosCtrl($rootScope, $http, ENV) {
        var gridAvaliacaoChamados = [];
        var dadosAvaliacaoChamados = [];

        var mes = moment($rootScope.mes);

        avaliacaoChamados();

        function avaliacaoChamados() {
            $http.get(ENV.API_ENDPOINT + '/avaliacaoChamadosPorColaborador', {
                params: {
                    dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                    dataFinal: mes.add(1, 'month').startOf('month').format('DD/MM/YYYY')
                }
            }).then(
                function (response) {
                    gridAvaliacaoChamados = response.data;
                    loadDataAvaliacaoChamados();
                    graficoAvaliacaoChamados().init();
                }
            );
        }

        var loadDataAvaliacaoChamados = function() {
            var dados = gridAvaliacaoChamados;
            var valor = 0;

            // ÓTIMO
            for(var i=0; i<dados.length; i++) {
                valor += dados[i].otimo;
            }
            dadosAvaliacaoChamados.push({label: "Ótimo", value: valor});

            // BOM
            valor = 0;
            for(var i=0; i<dados.length; i++) {
                valor += dados[i].bom;
            }
            dadosAvaliacaoChamados.push({label: "Bom", value: valor});

            // REGULAR
            valor = 0;
            for(var i=0; i<dados.length; i++) {
                valor += dados[i].regular;
            }
            dadosAvaliacaoChamados.push({label: "Regular", value: valor});

            // RUIM
            valor = 0;
            for(var i=0; i<dados.length; i++) {
                valor += dados[i].ruim;
            }
            dadosAvaliacaoChamados.push({label: "Ruim", value: valor});
        }

        function graficoAvaliacaoChamados() {
            return {
                init: function () {
					AmCharts.makeChart( "avaliacao-chamados-chart", {
						"type": "pie",
						"theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
						"dataProvider": dadosAvaliacaoChamados,
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