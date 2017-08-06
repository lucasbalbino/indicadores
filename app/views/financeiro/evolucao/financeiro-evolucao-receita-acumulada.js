( function() {
    'use strict';

    app.controller('FinEvolucaoReceitaAcumuladaCtrl', FinEvolucaoReceitaAcumuladaCtrl);

    FinEvolucaoReceitaAcumuladaCtrl.$inject = ['$rootScope', '$scope', 'ENV']

    function FinEvolucaoReceitaAcumuladaCtrl($rootScope, $scope, ENV) {
        var QTD_MESES = 12;
        var mes = moment($rootScope.mes);

        $scope.query = {
            url: ENV.API_ENDPOINT + '/receitaMensalAcumulada',
            data: {
                dataInicial: mes.subtract(QTD_MESES-1, 'month').startOf('month').format('DD/MM/YYYY'),
                dataFinal: mes.add(QTD_MESES-1, 'month').endOf('month').format('DD/MM/YYYY')
            }
        };

        $scope.columns = [
            {id: 'mes', titulo: 'Mês', size: '30%'},
            {id: 'total', titulo: 'Total', size: '30%', class: 'text-center'},
            {id: 'totalAcumulado', titulo: 'Total Acumulado', size: '40%', class: 'text-center'}
        ];

        $scope.columnsDefs = [{
            targets: 0,
            render: function (data) {
                return moment(data, 'YYYY-MM').locale('pt-br').format("MMM/YYYY");
            }
        },{
            targets: 1,
            type: 'brazilian-currency',
            render: function (data) {
                return currency(data.toFixed(2));
            }
        },{
            targets: 2,
            type: 'brazilian-currency',
            render: function (data) {
                return '<strong>' + currency(data.toFixed(2)); + '</strong>';
            }
        }];

        $scope.order = [[ 0, "asc" ]];
    }
})();