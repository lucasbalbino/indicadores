(function () {
    'use strict';

    app.controller('DevEvolucaoAbertasEncerradasCtrl', DevEvolucaoAbertasEncerradasCtrl);

    /** @ngInject */
    function DevEvolucaoAbertasEncerradasCtrl($scope, $rootScope, DesenvolvimentoEvolucaoService) {

        if ($rootScope.date === undefined) {
            $rootScope.date = {
                startDate: moment().startOf('month'),
                endDate: moment().endOf('month')
            };
        }

        var watcher = $rootScope.$watch('versao', function () {
            if ($rootScope.versao === undefined) {
                return;
            }
            watcher();

            var dataInicial = $rootScope.date.startDate.format('DD/MM/YYYY');
            var dataFinal = $rootScope.date.endDate.format('DD/MM/YYYY');

            $scope.query = DesenvolvimentoEvolucaoService.getRelacaoAtividadesAbertasEncerradasTable($rootScope.versao, dataInicial, dataFinal);

            $rootScope.$watch('date', function (newDate) {
                $rootScope.date = newDate;

                dataInicial = $rootScope.date.startDate.format('DD/MM/YYYY');
                dataFinal = $rootScope.date.endDate.format('DD/MM/YYYY');

                $scope.query = DesenvolvimentoEvolucaoService.getRelacaoAtividadesAbertasEncerradasTable($rootScope.versao, dataInicial, dataFinal);

                if($rootScope.reloadDataTable) {
                    $rootScope.reloadDataTable($scope.query);
                }
            }, false);
        });

        $scope.columns = [
            {id: 'tipo', titulo: 'Tipo', size: '55%'},
            {id: 'abertas', titulo: 'Abertas', size: '15%', 'total': true},
            {id: 'encerradas', titulo: 'Encerradas', size: '15%', 'total': true},
            {id: 'porcentagem', titulo: '%', size: '15%'}
        ];

        $scope.columnsDefs = [
            {
                "targets": 3,
                "render": function (data, type, full) {
                    if (data >= 100) {
                        return '<div class="success">' + data.toFixed(2) + '%</div>';
                    } else {
                        return '<div class="danger">' + data.toFixed(2) + '%</div>';
                    }
                }
            }
        ];

    }
})();