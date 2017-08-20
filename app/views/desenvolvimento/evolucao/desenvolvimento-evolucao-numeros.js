(function () {
    'use strict';

    app.controller('DevEvolucaoNumerosCtrl', DevEvolucaoNumerosCtrl);

    /** @ngInject */
    function DevEvolucaoNumerosCtrl($scope, $rootScope, $timeout, DesenvolvimentoEvolucaoService) {
        $scope.qtdEncerradasLiberadas = 0;
        $scope.qtdRejeitadas = 0;
        $scope.qtdAbertas = 0;
        $scope.qtdTotal = 0;

        $timeout(function() {
            numerosAtividadesPorSituacao();
        }, 1500);

        function numerosAtividadesPorSituacao() {
            DesenvolvimentoEvolucaoService.getAtividadesPorSituacao($rootScope.versao).then(
                function (response) {
                    var dados = response.data;

                    for (var i = 0; i < dados.length; i++) {
                        if (dados[i].label === "Liberada" || dados[i].label === "Encerrada") {
                            $scope.qtdEncerradasLiberadas += dados[i].value;
                        } else if (dados[i].label === "Rejeitada") {
                            $scope.qtdRejeitadas += dados[i].value;
                        } else {
                            $scope.qtdAbertas += dados[i].value;
                        }
                    }

                    $scope.qtdTotal = $scope.qtdAbertas + $scope.qtdEncerradasLiberadas + $scope.qtdRejeitadas;

                }, function (response) {
                    console.log("JSON do Gráfico Atividades Por Situacao incorreto");
                }
            );
        }

        $scope.porcentagem = function (qtd, total) {
            var p = Math.round((qtd / total) * 100);
            return isNaN(p) ? 0 : p;
        };
    }
})();