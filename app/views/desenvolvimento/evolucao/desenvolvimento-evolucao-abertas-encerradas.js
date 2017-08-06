(function () {
    'use strict';

    app.controller('DevEvolucaoAbertasEncerradasCtrl', DevEvolucaoAbertasEncerradasCtrl);

    DevEvolucaoAbertasEncerradasCtrl.$inject = ['$scope', '$rootScope', '$timeout', 'ENV']

    function DevEvolucaoAbertasEncerradasCtrl($scope, $rootScope, $timeout, ENV) {
        $scope.loaded = false;

        if ($rootScope.date == undefined) {
            $rootScope.date = {
                startDate: moment().startOf('month'),
                endDate: moment().endOf('month')
            }
        }

        $timeout(function () {
            $scope.query = {
                url: ENV.API_ENDPOINT + '/relacaoAtividadesAbertasEncerradas',
                data: {
                    versao: $rootScope.versao,
                    dataInicial: $rootScope.date.startDate.format('DD/MM/YYYY'),
                    dataFinal: $rootScope.date.endDate.format('DD/MM/YYYY')
                }
            };
            $scope.loaded = true;
        }, 1500);

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
                    if (data >= 100)
                        return '<div class="success">' + data.toFixed(2) + '%</div>';
                    else
                        return '<div class="danger">' + data.toFixed(2) + '%</div>';
                }
            }
        ];

        $scope.$watch('date', function (newDate) {
            if ($rootScope.reloadDataTable && $scope.query) {
                $rootScope.date = newDate;
                $scope.query.data.dataInicial = $rootScope.date.startDate.format('DD/MM/YYYY');
                $scope.query.data.dataFinal = $rootScope.date.endDate.format('DD/MM/YYYY');
                $rootScope.reloadDataTable($scope.query);
            }
        }, false);

    }
})();