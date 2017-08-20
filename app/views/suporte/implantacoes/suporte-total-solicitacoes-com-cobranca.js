(function () {
    'use strict';

    app.controller('SupTotalSolicitacoesComCobrancaCtrl', SupTotalSolicitacoesComCobrancaCtrl);

    /** @ngInject */
    function SupTotalSolicitacoesComCobrancaCtrl($scope, $rootScope, SuporteImplantacoesService) {
        var QTD_MESES = 4;
        var dadosTemp = [];
        var totais = [];

        $scope.dados = [];

        var mes = moment($rootScope.mes);

        carregaTotalSolicitacoesComCobranca(function () {
            consolidaTotais();
        });

        function carregaTotalSolicitacoesComCobranca(callback1) {

            var setaValoresChamados = function (n, callback2) {
                dadosTemp = 0;

                totalSolicitacoesComCobranca(
                    mes.startOf('month').format('DD/MM/YYYY'),
                    mes.endOf('month').format('DD/MM/YYYY'),
                    function () {
                        var total = 0;

                        for (var i = 0; i < dadosTemp.length; i++) {
                            if (dadosTemp[i].valor) {
                                total += dadosTemp[i].valor;
                            }
                        }

                        totais.push({
                            mes: mes.locale('pt-br').format("MMMM / YYYY"),
                            valor: total.toFixed(2)
                        });

                        mes = mes.subtract(1, 'month');

                        if (n < QTD_MESES) {
                            setaValoresChamados(n + 1, callback2);
                        }
                    });

                if (n === QTD_MESES) {
                    callback2();
                }
            };

            setaValoresChamados(0, function () {
                callback1();
            });
        }

        function totalSolicitacoesComCobranca(dataInicial, dataFinal, callback) {
            SuporteImplantacoesService.getValoresCamposAdicionais(dataInicial, dataFinal, 1).then(
                function (response) {
                    dadosTemp = response.data;
                    callback();
                }
            );
        }

        function consolidaTotais() {
            for (var i = 0; i < totais.length; i++) {
                var t = totais[i].valor;
                $scope.dados[i] = totais[i];
                $scope.dados[i].valor = currency($scope.dados[i].valor);

                if (i + 1 !== totais.length) {
                    $scope.dados[i].porcentagem = porcentagem(t, totais[i + 1].valor);
                } else {
                    $scope.dados[i].porcentagem = {};
                }
            }
        }
    }
})();