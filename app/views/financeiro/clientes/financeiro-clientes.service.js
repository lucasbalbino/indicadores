(function () {
    'use strict';

    app.service('FinanceiroClientesService', FinanceiroClientesService);

    /** @ngInject */
    function FinanceiroClientesService($http, $resource, ENV) {
        return {
            getEvolucaoReceitaCliente: getEvolucaoReceitaCliente,
            getFinanceiroFichaTecnica: getFinanceiroFichaTecnica,
            getFaturamentoListaClientes: getFaturamentoListaClientes,
            getUltimosFaturamentoPorClienteTable: getUltimosFaturamentoPorClienteTable
        };


        function getEvolucaoReceitaCliente(idCliente) {
            return $http.get(ENV.API_ENDPOINT + '/evolucaoReceitaCliente', {
                params: {
                    idCliente: idCliente
                }
            });
        }

        function getFinanceiroFichaTecnica(idCliente) {
            return $http.get(ENV.API_ENDPOINT + '/financeiroFichaTecnica', {
                params: {
                    idCliente: idCliente
                }
            });
        }

        function getFaturamentoListaClientes() {
            return $http.get(ENV.API_ENDPOINT + '/faturamentoListaClientes');
        }

        function getUltimosFaturamentoPorClienteTable(idCliente) {
            return $resource(ENV.API_ENDPOINT + '/ultimosFaturamentoPorCliente', {
                idCliente: idCliente
            }).query().$promise;
        }
    }
})();
