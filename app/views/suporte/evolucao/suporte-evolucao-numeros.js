(function () {
        'use strict';

        app.controller('SupEvolucaoNumerosCtrl', SupEvolucaoNumerosCtrl);

        SupEvolucaoNumerosCtrl.$inject = ['$scope', '$http', 'ENV']

        function SupEvolucaoNumerosCtrl($scope, $http, ENV) {
            $scope.qtdAguardandoAtendimento = 0;
            $scope.qtdAtrasados = 0;
            $scope.qtdEmAtendimento = 0;
            $scope.qtdParaEncerraHoje = 0;
            $scope.qtdSuspensos = 0;
            $scope.qtdAbertosComIteracao = 0;

            numerosChamados();

            function numerosChamados() {
                $http.get(ENV.API_ENDPOINT + '/chamadosPorSituacao').then(
                    function (response) {
                        var dados = response.data;

                        for (var i = 0; i < dados.length; i++) {
                            if (dados[i][0] == "Aguardando atendimento") {
                                $scope.qtdAguardandoAtendimento += dados[i][1];
                            } else if (dados[i][0] == "Atrasados") {
                                $scope.qtdAtrasados += dados[i][1];
                            } else if (dados[i][0] == "Em atendimento") {
                                $scope.qtdEmAtendimento += dados[i][1];
                            } else if (dados[i][0] == "Para Encerrar Hoje") {
                                $scope.qtdParaEncerraHoje += dados[i][1];
                            } else if (dados[i][0] == "Suspenso") {
                                $scope.qtdSuspensos += dados[i][1];
                            } else if (dados[i][0] == "Abertos com Iteração") {
                                $scope.qtdAbertosComIteracao += dados[i][1];
                            }
                        }

                    }, function (response) {
                        console.log("JSON do gráfico numerosChamados incorreto");
                    }
                );
            }
        }
})();