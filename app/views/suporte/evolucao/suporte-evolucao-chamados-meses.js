(function () {
    'use strict';

    app.controller('SupEvolucaoChamadosMesesCtrl', SupEvolucaoChamadosMesesCtrl);

    /** @ngInject */
    function SupEvolucaoChamadosMesesCtrl($scope, $rootScope, SuporteChamadosService) {
        var QTD_MESES = 13;

        var dadosTemp = [];
        $scope.dadosChamadosPorTipo = [];
        var gridChamadosPorTipo = [];

        $scope.chartOptions = {
            total: true,
            balloonText: "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
            graphs: [
                {
                    title: "Incidentes",
                    valueField: "incidentes"
                },
                {
                    title: "Requisições",
                    valueField: "requisicoes"
                },
                {
                    title: "Mudanças",
                    valueField: "mudancas"
                },
                {
                    title: "Outros",
                    valueField: "outros"
                }
            ],
            categoryField: "mes",
            valueAxes: [{
                "stackType": "regular"
            }]
        };

        carregaChamadosPorTipo(function () {
            $scope.dadosChamadosPorTipo = loadDataChamadosPorTipo();
            carregaEstatisticas();
        });

        function carregaChamadosPorTipo(callback1) {
            var mes = moment($rootScope.mes).subtract(QTD_MESES - 1, 'months');
            var dataTemp = moment($rootScope.mes).subtract(QTD_MESES - 1, 'months');

            var setaValoresChamados = function (n, callback2) {
                dadosTemp = 0;
                chamadosPorTipo(dataTemp.startOf('month').format('DD/MM/YYYY'), dataTemp.startOf('month').add(1, 'month').format('DD/MM/YYYY'), function () {

                    gridChamadosPorTipo.push({
                        mes: mes.locale('pt-br').format("MMM/YYYY"),
                        dados: dadosTemp
                    });

                    mes = mes.add(1, 'month');

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

        function chamadosPorTipo(dataInicial, dataFinal, callback) {
            SuporteChamadosService.getChamadosPorTipo(dataInicial, dataFinal).then(
                function (response) {
                    dadosTemp = response.data;
                    callback();
                }
            );
        }

        function loadDataChamadosPorTipo() {
            var dadosChamadosPorTipo = [];
            var data = gridChamadosPorTipo;

            var dado = {};

            for (var i = 0; i < data.length; i++) {
                dado = {};
                dado.mes = data[i].mes;
                for (var j = 0; j < data[i].dados.length; j++) {
                    if (data[i].dados[j].label === "Incidente") {
                        dado.incidentes = data[i].dados[j].value;
                    }
                    if (data[i].dados[j].label === "Requisição") {
                        dado.requisicoes = data[i].dados[j].value;
                    }
                    if (data[i].dados[j].label === "Mudança") {
                        dado.mudancas = data[i].dados[j].value;
                    }
                    if (data[i].dados[j].label === "Não Classificado" || data[i].dados[j].label === "[Depreciado]") {
                        dado.outros = data[i].dados[j].value;
                    }
                }
                dadosChamadosPorTipo.push(dado);
            }

            return dadosChamadosPorTipo;
        }

        function carregaEstatisticas() {
            $scope.mesAtual = {
                nome: gridChamadosPorTipo[QTD_MESES - 1].mes,
                total: totalChamados(gridChamadosPorTipo[QTD_MESES - 1].dados)
            };

            $scope.mesAnterior = {
                nome: gridChamadosPorTipo[QTD_MESES - 2].mes,
                total: totalChamados(gridChamadosPorTipo[QTD_MESES - 2].dados),
                porcentagem: porcentagem($scope.mesAtual.total, totalChamados(gridChamadosPorTipo[QTD_MESES - 2].dados), true)
            };

            $scope.anoAnterior = {
                nome: gridChamadosPorTipo[0].mes,
                total: totalChamados(gridChamadosPorTipo[0].dados),
                porcentagem: porcentagem($scope.mesAtual.total, totalChamados(gridChamadosPorTipo[0].dados), true)
            };
        }

        function totalChamados(array) {
            var total = 0;
            for (var i = 0; i < array.length; i++) {
                total += array[i].value;
            }
            return total;
        }
    }
})();