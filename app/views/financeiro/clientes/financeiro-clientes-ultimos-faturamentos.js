( function() {
    'use strict';

    app.controller('FinClientesUltimosFaturamentosCtrl', FinClientesUltimosFaturamentosCtrl);

    FinClientesUltimosFaturamentosCtrl.$inject = ['$rootScope', '$scope', 'ENV']

    function FinClientesUltimosFaturamentosCtrl($rootScope, $scope, ENV) {

        var mes = moment($rootScope.mes);

        if($rootScope.idCliente == null || $rootScope.idCliente == undefined) $rootScope.idCliente = 0;

        $scope.query = {
            url: ENV.API_ENDPOINT + '/ultimosFaturamentoPorCliente',
            data: {
                idCliente: $rootScope.idCliente
            }
        };

        $scope.columns = [
            {id: 'faturamento', titulo: 'Faturamento', size: '65%'},
            {id: 'valor', titulo: 'Valor', size: '10%', class: 'text-center'},
            {id: 'tipo', titulo: 'Tipo', size: '10%', class: 'text-center'},
            {id: 'data', titulo: 'Data', size: '15%', class: 'text-center'}
        ];

        $scope.columnsDefs = [{
            targets: 0,
            render: function (data) {
                return '<div class="tabela-dev-suporte">' + data + '</div>';
            }
        },{
            targets: 1,
            type: 'brazilian-currency',
            render: function (data) {
                return (data == 0) ? '' : currency(data.toFixed(2));
            }
        }];

        $scope.order = [[ 3, "desc" ]];
    }
})();