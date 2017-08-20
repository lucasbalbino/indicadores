(function () {
    'use strict';

    app.service('SuporteEvolucaoService', SuporteEvolucaoService);

    /** @ngInject */
    function SuporteEvolucaoService($http, ENV) {
        return {
            getChamadosAbertosEncerrados: getChamadosAbertosEncerrados,
            getChamadosPorTipo: getChamadosPorTipo,
            getChamadosPorSituacao: getChamadosPorSituacao
        };


        function getChamadosAbertosEncerrados(dataInicial, dataFinal) {
            return $http.get(ENV.API_ENDPOINT + '/chamadosAbertosEncerrados', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
                }
            });
        }

        function getChamadosPorTipo(dataInicial, dataFinal, idCliente) {
            return $http.get(ENV.API_ENDPOINT + '/chamadosPorTipo', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal,
                    idCliente: idCliente
                }
            });
        }

        function getChamadosPorSituacao() {
            return $http.get(ENV.API_ENDPOINT + '/chamadosPorSituacao');
        }
    }
})();
