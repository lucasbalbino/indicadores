(function () {
    'use strict';

    app.controller('SupChamadosPorPrioridadeCtrl', SupChamadosPorPrioridadeCtrl);

    /** @ngInject */
    function SupChamadosPorPrioridadeCtrl($scope, $rootScope, SuporteChamadosService) {
        var mes = moment($rootScope.mes);

        chamadosPorPrioridade();

        function chamadosPorPrioridade() {
            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteChamadosService.getChamadosPorPrioridade(dataInicial, dataFinal).then(
                function (response) {
                    var dados = response.data;
                    $scope.dadosChamadosPorPrioridade = trataOrdemPrioridades(dados);
                }
            );
        }

        function trataOrdemPrioridades(d) {
            var dados = [];

            // Prioridades do chamado ordenadas
            for (var i = 0; i < d.length; i++) {
                if (d[i].label === "Crítico") {
                    dados.push(d[i]);
                }
            }
            for (i = 0; i < d.length; i++) {
                if (d[i].label === "Alto") {
                    dados.push(d[i]);
                }
            }
            for (i = 0; i < d.length; i++) {
                if (d[i].label === "Médio") {
                    dados.push(d[i]);
                }
            }
            for (i = 0; i < d.length; i++) {
                if (d[i].label === "Baixo") {
                    dados.push(d[i]);
                }
            }
            for (i = 0; i < d.length; i++) {
                if (d[i].label === "Planejado") {
                    dados.push(d[i]);
                }
            }

            return dados;
        }
    }
})();