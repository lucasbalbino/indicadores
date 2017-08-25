(function () {
    'use strict';

    app.controller('SupAvaliacaoQuantidadeCtrl', SupAvaliacaoQuantidadeCtrl);

    /** @ngInject */
    function SupAvaliacaoQuantidadeCtrl($scope, $rootScope, SuporteAvaliacaoService) {
        var mes = moment($rootScope.mes);

        avaliacaoQuantidade();

        function avaliacaoQuantidade() {
            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteAvaliacaoService.getAvaliacaoChamadosQuantidade(dataInicial, dataFinal).then(
                function (response) {
                    $scope.dadosAvaliacaoQuantidade = response.data;
                }
            );
        }
    }
})();