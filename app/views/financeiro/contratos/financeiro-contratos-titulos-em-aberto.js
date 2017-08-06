( function() {
    'use strict';

    app.controller('FinContratosTitulosEmAbertoCtrl', FinContratosTitulosEmAbertoCtrl);

    FinContratosTitulosEmAbertoCtrl.$inject = ['$rootScope', '$scope', 'ENV']

    function FinContratosTitulosEmAbertoCtrl($rootScope, $scope, ENV) {

        var mes = moment($rootScope.mes);

        $scope.query = {
            url: ENV.API_ENDPOINT + '/titulosAbertosClientes'
        };

        $scope.columns = [
            {id: 'cliente', titulo: 'Cliente', size: '60%'},
            {id: 'nf', titulo: 'NF', size: '10%', class: 'text-center'},
            {id: 'valor', titulo: 'Valor', size: '15%', class: 'text-center'},
            {id: 'vencimento', titulo: 'Data de Vencimento', size: '15%', class: 'text-center'}
        ];

        $scope.order = [[ 3, "desc" ]];

        $scope.columnsDefs = [{
            targets: 2,
            type: 'brazilian-currency',
            render: function (data) {
                return currency(data.toFixed(2));
            }
        }];
    }
})();