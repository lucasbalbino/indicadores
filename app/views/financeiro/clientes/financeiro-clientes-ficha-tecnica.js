(function() {
    'use strict';

    app.controller('FinClientesFichaTecnicaCtrl', FinClientesFichaTecnicaCtrl);

    FinClientesFichaTecnicaCtrl.$inject = ['$scope', '$rootScope', '$http', 'ENV']

    function FinClientesFichaTecnicaCtrl($scope, $rootScope, $http, ENV) {

        if($rootScope.idCliente == null || $rootScope.idCliente == undefined) $rootScope.idCliente = 0;

        $scope.dadosCliente = {};

		dadosCliente();

        function dadosCliente() {
            $http.get(ENV.API_ENDPOINT + '/financeiroFichaTecnica', {
                params: {
                    idCliente: $rootScope.idCliente
                }
            }).then(
                function (response) {
                    var dados = response.data;

                    if(dados.length != 0) {
                        $scope.dadosCliente = dados[0];
                    }
                }
            );
        }
    }
})();