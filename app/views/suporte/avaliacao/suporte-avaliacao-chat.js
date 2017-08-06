( function() {
    'use strict';

    app.controller('SupAvaliacaoChatCtrl', SupAvaliacaoChatCtrl);

    SupAvaliacaoChatCtrl.$inject = ['$rootScope', '$http', 'ENV']

    function SupAvaliacaoChatCtrl($rootScope, $http, ENV) {
        var gridAvaliacaoChat = [];
        var dadosAvaliacaoChat = [];

        var mes = moment($rootScope.mes);

        avaliacaoChamados();

        function avaliacaoChamados() {
            $http.get(ENV.API_ENDPOINT + '/avaliacaoChatPorColaborador', {
                params: {
                    dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                    dataFinal: mes.add(1, 'month').startOf('month').format('DD/MM/YYYY')
                }
            }).then(
                function (response) {
                    gridAvaliacaoChat = response.data;
                    loadDataAvaliacaoChat();
                    graficoAvaliacaoChat().init();
                }
            );
        }

        var loadDataAvaliacaoChat = function() {
            var dados = gridAvaliacaoChat;
            var valor = 0;

            // ÓTIMO
            for(var i=0; i<dados.length; i++) {
                valor += dados[i].otimo;
            }
            dadosAvaliacaoChat.push({label: "Ótimo", value: valor});

            // BOM
            valor = 0;
            for(var i=0; i<dados.length; i++) {
                valor += dados[i].bom;
            }
            dadosAvaliacaoChat.push({label: "Bom", value: valor});

            // REGULAR
            valor = 0;
            for(var i=0; i<dados.length; i++) {
                valor += dados[i].regular;
            }
            dadosAvaliacaoChat.push({label: "Regular", value: valor});

            // RUIM
            valor = 0;
            for(var i=0; i<dados.length; i++) {
                valor += dados[i].ruim;
            }
            dadosAvaliacaoChat.push({label: "Ruim", value: valor});
        }

        function graficoAvaliacaoChat() {
            return {
                init: function () {
					AmCharts.makeChart( "avaliacao-chat-chart", {
						"type": "pie",
						"theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
						"dataProvider": dadosAvaliacaoChat,
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