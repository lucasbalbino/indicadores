(function () {
    'use strict';

    app.service('ComercialClientesService', ComercialClientesService);

    /** @ngInject */
    function ComercialClientesService($http, $resource, ENV) {
        return {
            getDadosCliente: getDadosCliente,
            getClientes: getClientes,
            getUltimosChamadosTable: getUltimosChamadosTable
        };


        function getDadosCliente(idCliente) {
            return $http.get(ENV.API_ENDPOINT + '/dadosCliente', {
                params: {
                    idCliente: idCliente
                }
            });
        }

        function getClientes() {
            return $http.get(ENV.API_ENDPOINT + '/clientes');
        }

        function getUltimosChamadosTable(idCliente) {
            return $resource(ENV.API_ENDPOINT + '/ultimosChamados', {
                idCliente: idCliente
            }).query().$promise;
        }
    }
})();
