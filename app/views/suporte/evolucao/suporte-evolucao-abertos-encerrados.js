(function () {
    'use strict';

    app.controller('SupEvolucaoAbertosEncerradosCtrl', SupEvolucaoAbertosEncerradosCtrl);

    /** @ngInject */
    function SupEvolucaoAbertosEncerradosCtrl($scope, $rootScope, SuporteEvolucaoService) {
        var gridChamadosAbertosEncerrados;

        $scope.chartOptions = {
            categoryAxis: {
                "minorTickLength": 1,
                "minHorizontalGap": 1,
                "labelFunction": "DD"
            },
            label: "data",
            graphs: [{
                "title": "Abertos",
                "valueField": "abertos",
                "balloonText": "[[value]] aberto(s)"
            }, {
                "title": "Encerrados",
                "valueField": "encerrados",
                "balloonText": "[[value]] encerrado(s)"
            }],
            date: true
        };

        chamadosAbertosEncerrados();

        function chamadosAbertosEncerrados() {
            gridChamadosAbertosEncerrados = [];

            var mes = moment($rootScope.mes);

            var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
            var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');

            SuporteEvolucaoService.getChamadosAbertosEncerrados(dataInicial, dataFinal).then(
                function (response) {
                    gridChamadosAbertosEncerrados = response.data;
                    $scope.dadosChamadosAbertosEncerrados = loadDataChamadosAbertosEncerrados();
                }, function (response) {
                    console.log("JSON do gráfico chamadosAbertosEncerrados incorreto: " + response);
                }
            );
        }

        var loadDataChamadosAbertosEncerrados = function () {
            var dadosChamadosAbertosEncerrados = [];
            var mes = moment($rootScope.mes);

            $scope.totalAbertos = 0;
            $scope.totalEncerrados = 0;

            var dados = gridChamadosAbertosEncerrados;

            var datasMes = mes.range('month');

            var k = 0;
            datasMes.by('days', function (m) {
                if (k < dados.length && m.isSame(moment(dados[k].data, "DD/MM/YYYY"), 'day')) {
                    var data = moment(dados[k].data, "DD/MM/YYYY").valueOf();
                    $scope.totalAbertos += parseInt(dados[k].abertos);
                    $scope.totalEncerrados += parseInt(dados[k].encerrados);
                    dadosChamadosAbertosEncerrados.push(dados[k]);
                    k++;
                } else {
                    dadosChamadosAbertosEncerrados.push({
                        "data": m.format("DD/MM/YYYY"),
                        "encerrados": 0,
                        "abertos": 0
                    });
                }
            });

            return dadosChamadosAbertosEncerrados;
        };

    }
})();