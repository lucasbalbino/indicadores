(function () {
    'use strict';

    app.controller('CiBuildsAnaliseCtrl', CiBuildsAnaliseCtrl);

    CiBuildsAnaliseCtrl.$inject = ['$rootScope', '$scope', 'ENV']

    function CiBuildsAnaliseCtrl($rootScope, $scope, ENV) {

        if($rootScope.date == undefined) {
            $rootScope.date = {
                startDate: moment().startOf('month'),
                endDate: moment().endOf('month')
            }
        }

        $scope.query = {
            url: ENV.API_ENDPOINT + '/relatorioEntreAsDatas',
            data: {
                dataInicial: $rootScope.date.startDate.format('DD/MM/YYYY'),
                dataFinal: $rootScope.date.endDate.format('DD/MM/YYYY')
            }
        };

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
                "render": function(data) { return '<div class="success">' + data + '</div>'; }
            },{
                "targets": 2,
                "render": function(data) { return '<div class="danger">' + data + '</div>'; }
            },{
                "targets": 3,
                "render": function(data) { return '<div class="warning">' + data + '</div>'; }
            },{
                "targets": 4,
                "render": function(data) { return '<div class="carbon">' + data + '</div>'; }
            },{
                "targets": 5,
                "render": function(data) { return '<strong>' + data + '</strong>'; }
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