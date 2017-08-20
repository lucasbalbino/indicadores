(function () {
    'use strict';

    app.controller('SupChamadosClientesCtrl', SupChamadosClientesCtrl);

    /** @ngInject */
    function SupChamadosClientesCtrl($rootScope, $scope, $state, SuporteChamadosService) {

        var mes = moment($rootScope.mes);
        $scope.origens = ["Todas"];
        $scope.loaded = false;

        function getOrigens() {
            SuporteChamadosService.getOrigensChamado().then(
                function (response) {
                    var array = response.data;
                    for (var i = 0; i < array.length; i++) {
                        $scope.origens.push(array[i][1]);
                    }

                    $scope.loaded = true;

                    if (!$rootScope.origem) {
                        $rootScope.origem = $scope.origens[0];
                    }

                    var dataInicial = mes.startOf('month').format('DD/MM/YYYY');
                    var dataFinal = mes.add(1, 'month').startOf('month').format('DD/MM/YYYY');
                    var origem = $scope.origens.indexOf($rootScope.origem);

                    if ($rootScope.origem === "Todas") {
                        $scope.query = SuporteChamadosService.getRankingDeClientesTable(dataInicial, dataFinal);
                    } else {
                        $scope.query = SuporteChamadosService.getRankingDeClientesTable(dataInicial, dataFinal, origem);
                    }

                    $scope.columns = [
                        {id: 'cliente', titulo: 'Cliente', size: '80%'},
                        {id: 'quantidade', titulo: 'Quantidade', size: '10%', class: 'text-center', total: true},
                        {
                            id: 'porcentagem',
                            titulo: '%',
                            size: '10%',
                            class: 'text-center',
                            total: true,
                            totalTipo: 'porcentagem'
                        }
                    ];

                    $scope.order = [[1, "desc"]];
                }
            );
        }

        $scope.alteraOrigem = function (id) {
            $rootScope.origem = id;
            $state.reload();
        };

        getOrigens();
    }
})();