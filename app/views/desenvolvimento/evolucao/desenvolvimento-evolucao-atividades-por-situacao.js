(function () {
    'use strict';

    app.controller('DevEvolucaoAtividadesPorSituacaoCtrl', DevEvolucaoAtividadesPorSituacaoCtrl);

    /** @ngInject */
    function DevEvolucaoAtividadesPorSituacaoCtrl($rootScope, $timeout, DesenvolvimentoEvolucaoService) {
        var gridAtividadesPorSituacao = [];
        var dadosAtividadesPorSituacao = [];
        var legendaAtividadesPorSituacao = [];

        $timeout(function () {
            atividadesPorSituacao();
        }, 1500);

        function atividadesPorSituacao() {
            gridAtividadesPorSituacao = [];
            dadosAtividadesPorSituacao = [];
            legendaAtividadesPorSituacao = [];

            DesenvolvimentoEvolucaoService.getAtividadesPorSituacao($rootScope.versao).then(
                function (response) {
                    gridAtividadesPorSituacao = response.data;
                    loadDataAtividadesPorSituacao();

                    // Se a Sprint ainda não foi encerrada, gera o gráfico de Atividades
                    if (dadosAtividadesPorSituacao !== '') {
                        graficoAtividadesPorSituacao().init();
                    } else {
                        $("#atividades-por-situacao-chart").html("Sprint Encerrada");
                    }
                }, function (response) {
                    console.log("JSON do Gráfico Atividades Por Situacao incorreto");
                }
            );
        }

        function graficoAtividadesPorSituacao() {
            return {
                init: function () {
                    AmCharts.makeChart("atividades-por-situacao-chart", {
                        "type": "serial",
                        "theme": "light",
                        "colors": $rootScope.colors,
                        "fontFamily": "'Open Sans', 'Segoe UI'",
                        "dataProvider": dadosAtividadesPorSituacao,
                        "graphs": [{
                            "balloonText": "[[value]]",
                            "labelText": "[[value]]",
                            "fillAlphas": 0.8,
                            "lineAlpha": 0.2,
                            "type": "column",
                            "valueField": "value"
                        }],
                        "chartCursor": {
                            "categoryBalloonEnabled": false,
                            "cursorAlpha": 0,
                            "zoomable": false
                        },
                        "categoryAxis": {
                            "autoWrap": true
                        },
                        "startDuration": 1,
                        "categoryField": "label"
                    });
                }
            };
        }

        function loadDataAtividadesPorSituacao() {

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

        }
    }
})();