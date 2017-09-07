(function () {
    'use strict';

    app.controller('FinFaturamentoEvolucaoResponsavelCtrl', FinFaturamentoEvolucaoResponsavelCtrl);

    /** @ngInject */
    function FinFaturamentoEvolucaoResponsavelCtrl($scope, $rootScope, FinanceiroFaturamentoService) {
        var gridReceita = [];

        $scope.receitas = ['Total', 'Mensalidade', 'Setup'];
        $scope.receita = $scope.receitas[0];

        $scope.alteraForma = function (id) {
            $scope.dadosReceita = null;
            $scope.receita = id;

            if (gridReceita.length !== 0) {
                $scope.dadosReceita = trataDadosReceitaPorMes(id.toLowerCase());
            }
        };

        receitaPorMes($scope.receita.toLowerCase());

        function receitaPorMes(id) {
            FinanceiroFaturamentoService.getFaturamentoEvolucaoResponsavel().then(
                function (response) {
                    gridReceita = response.data;

                    for (var i = 0; i < gridReceita.length; i++) {
                        gridReceita[i].mensalidade = gridReceita[i].mensalidade.toFixed(2);
                        gridReceita[i].setup = gridReceita[i].setup.toFixed(2);
                        gridReceita[i].total = gridReceita[i].total.toFixed(2);
                        gridReceita[i].mes = moment(gridReceita[i].mes, 'YYYY-MM').locale('pt-br').format("MMM/YYYY")
                    }

                    $scope.dadosReceita = trataDadosReceitaPorMes(id);
                }
            );
        }

        function trataDadosReceitaPorMes(id) {
            var dadosReceita = [];
            $scope.meses = [];
            $scope.responsaveis = [];
            for (var i = 0; i < gridReceita.length; i++) {
                if (!$scope.meses.includes(gridReceita[i].mes)) {
                    $scope.meses.push(gridReceita[i].mes);
                }
                if (!$scope.responsaveis.includes(gridReceita[i].responsavel)) {
                    $scope.responsaveis.push(gridReceita[i].responsavel);
                }
            }

            $scope.responsaveis.sort();

            for (var k = 0; k < $scope.meses.length; k++) {
                var dado = {};
                var tempMes = $scope.meses[k];
                dado.mes = tempMes;
                var totais = [];

                for (var j = 0; j < $scope.responsaveis.length; j++) {
                    var tempResp = $scope.responsaveis[j];

                    for (var i = 0; i < gridReceita.length; i++) {
                        if (gridReceita[i].mes === tempMes && gridReceita[i].responsavel === tempResp) {
                            if (id === 'total') {
                                dado[id + j] = gridReceita[i].total;
                            }
                            else if (id === 'mensalidade') {
                                dado[id + j] = gridReceita[i].mensalidade;
                            }
                            else if (id === 'setup') {
                                dado[id + j] = gridReceita[i].setup;
                            }
                        }
                    }

                }

                $scope.chartOptions = {
                    currency: true,
                    label: "mes",
                    zoom: true,
                    graphs: setaColunasGerentes(id)
                };

                dadosReceita.push(dado);
            }

            return dadosReceita;
        }

        function setaColunasGerentes(id) {
            var graph = [];
            for (var j = 0; j < $scope.responsaveis.length; j++) {
                var resp = $scope.responsaveis[j];
                graph.push({
                    "balloonFunction": true,
                    "labelText": "[[value]]",
                    "title": resp,
                    "valueField": id + j,
                    "labelFunction": true
                });
            }
            return graph;
        }
    }
})();