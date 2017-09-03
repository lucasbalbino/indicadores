( function() {
    'use strict';

    app.controller('SupAvaliacaoChatCtrl', SupAvaliacaoChatCtrl);

    /** @ngInject */
    function SupAvaliacaoChatCtrl($scope, $rootScope, SuporteAvaliacaoService) {
        var gridAvaliacaoChat = [];

        var mes = moment($rootScope.mes);

        avaliacaoChamados();

        function avaliacaoChamados() {
            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteAvaliacaoService.getAvaliacaoChatPorColaborador(dataInicial, dataFinal).then(
                function (response) {
                    gridAvaliacaoChat = response.data;
                    $scope.dadosAvaliacaoChat = loadDataAvaliacaoChat();
                }
            );
        }

        function loadDataAvaliacaoChat() {
            var dadosAvaliacaoChat = [];
            var dados = gridAvaliacaoChat;
            var valor = 0;

            // ÓTIMO
            for(var i=0; i<dados.length; i++) {
                valor += dados[i].otimo;
            }
            dadosAvaliacaoChat.push({label: "Ótimo", value: valor});

            // BOM
            valor = 0;
            for(i=0; i<dados.length; i++) {
                valor += dados[i].bom;
            }
            dadosAvaliacaoChat.push({label: "Bom", value: valor});

            // REGULAR
            valor = 0;
            for(i=0; i<dados.length; i++) {
                valor += dados[i].regular;
            }
            dadosAvaliacaoChat.push({label: "Regular", value: valor});

            // RUIM
            valor = 0;
            for(i=0; i<dados.length; i++) {
                valor += dados[i].ruim;
            }
            dadosAvaliacaoChat.push({label: "Ruim", value: valor});

            return dadosAvaliacaoChat;
        }
    }
})();