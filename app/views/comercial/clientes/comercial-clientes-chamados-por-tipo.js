(function () {
    'use strict';

    app.controller('ComClientesChamadosPorTipoCtrl', ComClientesChamadosPorTipoCtrl);

    /** @ngInject */
    function ComClientesChamadosPorTipoCtrl($scope, $rootScope, SuporteChamadosService) {
        var QTD_MESES = 6;

        var dadosTemp = [];
        var gridChamadosPorTipo = [];

        if ($rootScope.idCliente === null || $rootScope.idCliente === undefined) {
            $rootScope.idCliente = 0;
        }

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
            if ($rootScope.idCliente !== 0) {
                $scope.dadosChamadosPorTipo = loadDataChamadosPorTipo();
            }
        });

        function carregaChamadosPorTipo(callback1) {
            var mes = moment().subtract(QTD_MESES, 'months');
            var dataTemp = moment().subtract(QTD_MESES, 'months');

            var setaValoresChamados = function (n, callback2) {
                dadosTemp = 0;
                chamadosPorTipoIdCliente(dataTemp.startOf('month').format('DD/MM/YYYY'), dataTemp.startOf('month').add(1, 'month').format('DD/MM/YYYY'), function () {

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

        function chamadosPorTipoIdCliente(dataInicial, dataFinal, callback) {
            SuporteChamadosService.getChamadosPorTipo(dataInicial, dataFinal, $rootScope.idCliente).then(
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
    }
})();