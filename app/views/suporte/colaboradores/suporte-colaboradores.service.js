(function () {
    'use strict';

    app.service('SuporteColaboradoresService', SuporteColaboradoresService);

    /** @ngInject */
    function SuporteColaboradoresService($http, ENV) {
        return {
            getChamadosPorColaborador: getChamadosPorColaborador
        };

        function getChamadosPorColaborador(dataInicial, dataFinal) {
            return $http.get(ENV.API_ENDPOINT + '/chamadosPorColaborador', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
                }
            });
        }
    }
})();
