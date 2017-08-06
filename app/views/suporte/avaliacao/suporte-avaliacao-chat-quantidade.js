( function() {
    'use strict';

    app.controller('SupChatQuantidadeCtrl', SupChatQuantidadeCtrl);

    SupChatQuantidadeCtrl.$inject = ['$rootScope', '$http', 'ENV']

    function SupChatQuantidadeCtrl($rootScope, $http, ENV) {
        var dadosChatQuantidade = [];
        var mes = moment($rootScope.mes);

        chatQuantidade();

        function chatQuantidade() {
            $http.get(ENV.API_ENDPOINT + '/avaliacaoChatQuantidade', {
                params: {
                    dataInicial: mes.startOf('month').format('DD/MM/YYYY'),
                    dataFinal: mes.add(1, 'month').startOf('month').format('DD/MM/YYYY')
                }
            }).then(
                function (response) {
                    dadosChatQuantidade = response.data;
                    trataChatQuantidade();
                    graficoChatQuantidade().init();
                }
            );
        }

        function trataChatQuantidade() {
            var valor = 0;
            for(var i=0; i<dadosChatQuantidade.length; i++) {
                if(dadosChatQuantidade[i].label == "Avaliados") {
                    valor = dadosChatQuantidade[i].label;
                }
                if(dadosChatQuantidade[i].label == "Total") {
                    dadosChatQuantidade[i].value = valor - dadosChatQuantidade[i].value;
                    dadosChatQuantidade[i].label = "Não Avaliados";
                }
            }
        }

        function graficoChatQuantidade() {
            return {
                init: function () {
					AmCharts.makeChart( "chat-quantidade-chart", {
						"type": "pie",
						"theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
						"dataProvider": dadosChatQuantidade,
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