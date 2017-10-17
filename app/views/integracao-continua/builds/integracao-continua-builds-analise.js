(function () {
    'use strict';

    app.controller('CiBuildsAnaliseCtrl', CiBuildsAnaliseCtrl);

    /** @ngInject */
    function CiBuildsAnaliseCtrl($rootScope, $scope, IntegracaoContinuaBuildsService) {

        if ($rootScope.date === undefined) {
            $rootScope.date = {
                startDate: moment().startOf('month'),
                endDate: moment().endOf('month')
            };
        }

        var dataInicial = $rootScope.date.startDate.format('DD/MM/YYYY');
        var dataFinal = $rootScope.date.endDate.format('DD/MM/YYYY');

        $scope.query = IntegracaoContinuaBuildsService.getRelatorioEntreAsDatasTable(dataInicial, dataFinal);

        $scope.columns = [
            {id: 'job', titulo: 'Job', size: '50%'},
            {id: 'sucesso', titulo: 'Sucesso', size: '10%', class: 'text-center'},
            {id: 'falha', titulo: 'Falha', size: '10%', class: 'text-center'},
            {id: 'instavel', titulo: 'Instável', size: '10%', class: 'text-center'},
            {id: 'abortado', titulo: 'Abortado', size: '10%', class: 'text-center'},
            {id: 'total', titulo: 'Total', size: '10%', class: 'text-center'},
            //{id: 'porcentagem', titulo: '%'}
        ];

        $scope.columnsDefs = [
            {
                "targets": 1,
                "render": function (data) {
                    return '<div class="success">' + data + '</div>';
                }
            }, {
                "targets": 2,
                "render": function (data) {
                    return '<div class="danger">' + data + '</div>';
                }
            }, {
                "targets": 3,
                "render": function (data) {
                    return '<div class="warning">' + data + '</div>';
                }
            }, {
                "targets": 4,
                "render": function (data) {
                    return '<div class="carbon">' + data + '</div>';
                }
            }, {
                "targets": 5,
                "render": function (data) {
                    return '<strong>' + data + '</strong>';
                }
            }
        ];

        $rootScope.$watch('date', function (newDate) {
            $rootScope.date = newDate;

            dataInicial = $rootScope.date.startDate.format('DD/MM/YYYY');
            dataFinal = $rootScope.date.endDate.format('DD/MM/YYYY');

            $scope.query = IntegracaoContinuaBuildsService.getRelatorioEntreAsDatasTable(dataInicial, dataFinal);

            if($rootScope.reloadDataTable) {
                $rootScope.reloadDataTable($scope.query);
            }
        }, false);
    }
})();