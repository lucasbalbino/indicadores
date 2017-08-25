(function () {
    'use strict';

    app.controller('SupChatQuantidadeCtrl', SupChatQuantidadeCtrl);

    /** @ngInject */
    function SupChatQuantidadeCtrl($scope, $rootScope, SuporteAvaliacaoService) {
        $scope.dadosChatQuantidade = [];
        var mes = moment($rootScope.mes);

        chatQuantidade();

        function chatQuantidade() {
            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteAvaliacaoService.getAvaliacaoChatQuantidade(dataInicial, dataFinal).then(
                function (response) {
                    var dados = response.data;
                    $scope.dadosChatQuantidade = trataChatQuantidade(dados);
                }
            );
        }

        function trataChatQuantidade(dados) {
            var valor = 0;
            for (var i = 0; i < dados.length; i++) {
                if (dados[i].label === "Avaliados") {
                    valor = dados[i].label;
                }
                if (dados[i].label === "Total") {
                    dados[i].value = valor - dados[i].value;
                    dados[i].label = "Não Avaliados";
                }
            }

            return dados;
        }
    }
})();