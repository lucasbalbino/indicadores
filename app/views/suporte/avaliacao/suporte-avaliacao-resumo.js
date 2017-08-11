(function () {
    'use strict';

    app.controller('SupAvaliacaoResumoCtrl', SupAvaliacaoResumoCtrl);

    /** @ngInject */
    function SupAvaliacaoResumoCtrl($scope, $rootScope, SuporteAvaliacaoService) {
        var mes = moment($rootScope.mes);

        $scope.avaliacoes = {
            mes: mes.locale('pt-br').format('MMMM / YYYY'),
            valor: 0
        };

        avaliacoesResumo(function () {
            var dataInicial = mes.subtract(2, 'month').startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteAvaliacaoService.getAvaliacaoChamadosPorColaborador(dataInicial, dataFinal).then(
                function (response) {
                    var dados = response.data;
                    $scope.avaliacoes.mesAnteriorValor = 0;

                    for (var i = 0; i < dados.length; i++) {
                        $scope.avaliacoes.mesAnteriorValor += dados[i].otimo + dados[i].bom;
                    }

                    var dataInicial = mes.subtract(1, 'month').startOf('month').format('DD/MM/YYYY');
                    var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

                    SuporteAvaliacaoService.getAvaliacaoChamadosQuantidade(dataInicial, dataFinal).then(
                        function (response) {
                            dados = response.data;
                            for (var i = 0; i < dados.length; i++) {
                                if (dados[i].label === "Avaliados") {
                                    $scope.avaliacoes.mesAnteriorValor = ($scope.avaliacoes.mesAnteriorValor / dados[i].value) * 100;
                                    $scope.avaliacoes.mesAnteriorValor = $scope.avaliacoes.mesAnteriorValor.toFixed(2);

                                    $scope.avaliacoes.porcentagem = porcentagem($scope.avaliacoes.valor,
                                        $scope.avaliacoes.mesAnteriorValor);

                                    setEmojiColor();
                                }
                            }
                        }
                    );
                }
            );
        });

        function avaliacoesResumo(callback) {
            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteAvaliacaoService.getAvaliacaoChamadosPorColaborador(dataInicial, dataFinal).then(
                function (response) {
                    var dados = response.data;

                    for (var i = 0; i < dados.length; i++) {
                        $scope.avaliacoes.valor += dados[i].otimo + dados[i].bom;
                    }

                    var dataInicial = mes.subtract(1, 'month').startOf('month').format('DD/MM/YYYY');
                    var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

                    SuporteAvaliacaoService.getAvaliacaoChamadosQuantidade(dataInicial, dataFinal).then(
                        function (response) {
                            dados = response.data;
                            for (var i = 0; i < dados.length; i++) {
                                if (dados[i].label === "Avaliados") {
                                    $scope.avaliacoes.valor = ($scope.avaliacoes.valor / dados[i].value) * 100;
                                    $scope.avaliacoes.valor = $scope.avaliacoes.valor.toFixed(2);
                                }
                            }
                        }
                    );
                    callback();
                }
            );
        }

        function setEmojiColor() {
            if ($scope.avaliacoes.valor >= 97) {
                $scope.avaliacoes.emoji = "fa fa-smile-o";
                $scope.avaliacoes.emojiColor = "success";
            }
            else if ($scope.avaliacoes.valor > 95 && $scope.avaliacoes.valor < 97) {
                $scope.avaliacoes.emoji = "fa fa-meh-o";
                $scope.avaliacoes.emojiColor = "warning";
            }
            else {
                $scope.avaliacoes.emoji = "fa fa-frown-o";
                $scope.avaliacoes.emojiColor = "danger";
            }

        }
    }
})();