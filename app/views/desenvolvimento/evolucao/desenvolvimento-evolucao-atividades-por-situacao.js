(function () {
    'use strict';

    app.controller('DevEvolucaoAtividadesPorSituacaoCtrl', DevEvolucaoAtividadesPorSituacaoCtrl);

    /** @ngInject */
    function DevEvolucaoAtividadesPorSituacaoCtrl($scope, $rootScope, DesenvolvimentoEvolucaoService) {
        var gridAtividadesPorSituacao = [];

        var watcher = $rootScope.$watch('versao', function () {
            if ($rootScope.versao === undefined) {
                return;
            }
            watcher();
            atividadesPorSituacao();
        });

        function atividadesPorSituacao() {
            gridAtividadesPorSituacao = [];
            var dadosAtividadesPorSituacao = [];

            DesenvolvimentoEvolucaoService.getAtividadesPorSituacao($rootScope.versao).then(
                function (response) {
                    gridAtividadesPorSituacao = response.data;
                    dadosAtividadesPorSituacao = loadDataAtividadesPorSituacao();

                    // Se a Sprint ainda não foi encerrada, gera o gráfico de Atividades
                    if (dadosAtividadesPorSituacao.length !== 0) {
                        $scope.dadosAtividadesPorSituacao = dadosAtividadesPorSituacao;
                    } else {
                        $("#sprint-encerrada").removeClass("hidden");
                        $("#load-atividades-por-situacao-chart").hide();
                    }
                }, function (response) {
                    console.log("JSON do Gráfico Atividades Por Situacao incorreto");
                }
            );
        }

        function loadDataAtividadesPorSituacao() {
            var dadosAtividadesPorSituacao = [];
            var dados = gridAtividadesPorSituacao;

            // Atividades abertas (em ordem do Kanban)
            var i;
            for (i = 0; i < dados.length; i++) {
                if (dados[i].label === "Nova") {
                    dadosAtividadesPorSituacao.push(dados[i]);
                }
            }

            for (i = 0; i < dados.length; i++) {
                if (dados[i].label === "Analisada") {
                    dadosAtividadesPorSituacao.push(dados[i]);
                }
            }

            for (i = 0; i < dados.length; i++) {
                if (dados[i].label === "Informações Insuficientes") {
                    dadosAtividadesPorSituacao.push(dados[i]);
                }
            }

            for (i = 0; i < dados.length; i++) {
                if (dados[i].label === "Conceituada") {
                    dadosAtividadesPorSituacao.push(dados[i]);
                }
            }

            for (i = 0; i < dados.length; i++) {
                if (dados[i].label === "Em Progresso") {
                    dadosAtividadesPorSituacao.push(dados[i]);
                }
            }

            for (i = 0; i < dados.length; i++) {
                if (dados[i].label === "Bloqueada") {
                    dadosAtividadesPorSituacao.push(dados[i]);
                }
            }

            for (i = 0; i < dados.length; i++) {
                if (dados[i].label === "Pausada") {
                    dadosAtividadesPorSituacao.push(dados[i]);
                }
            }

            for (i = 0; i < dados.length; i++) {
                if (dados[i].label === "Revisando") {
                    dadosAtividadesPorSituacao.push(dados[i]);
                }
            }

            for (i = 0; i < dados.length; i++) {
                if (dados[i].label === "Aguardando Merge") {
                    dadosAtividadesPorSituacao.push(dados[i]);
                }
            }

            for (i = 0; i < dados.length; i++) {
                if (dados[i].label === "Aguardando Teste") {
                    dadosAtividadesPorSituacao.push(dados[i]);
                }
            }

            for (i = 0; i < dados.length; i++) {
                if (dados[i].label === "Testando") {
                    dadosAtividadesPorSituacao.push(dados[i]);
                }
            }

            for (i = 0; i < dados.length; i++) {
                if (dados[i].label === "Não testável") {
                    dadosAtividadesPorSituacao.push(dados[i]);
                }
            }

            return dadosAtividadesPorSituacao;

        }
    }
})();