(function () {
    'use strict';

    app.service('SuporteCategoriasService', SuporteCategoriasService);

    /** @ngInject */
    function SuporteCategoriasService($http, ENV) {
        return {
            getChamadosPorCategoria: getChamadosPorCategoria
        };

        function getChamadosPorCategoria(dataInicial, dataFinal, tipo) {
            return $http.get(ENV.API_ENDPOINT + '/chamadosPorCategoria', {
                params: {
                    dataInicial: dataInicial,
                    dataFinal: dataFinal,
                    tipo: tipo
                }
            });
        }
    }
})();
