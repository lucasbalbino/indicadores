(function () {
    'use strict';

    app.service('DesenvolvimentoColaboradoresService', DesenvolvimentoColaboradoresService);

    /** @ngInject */
    function DesenvolvimentoColaboradoresService($http, ENV) {
        return {
            getResolvidasPorColaborador: getResolvidasPorColaborador,
            getTestadasPorColaborador: getTestadasPorColaborador
        };


        function getResolvidasPorColaborador(versao) {
            return $http.get(ENV.API_ENDPOINT + '/resolvidasPorColaborador', {
                params: {
                    versao: versao
                }
            });
        }

        function getTestadasPorColaborador(versao) {
            return $http.get(ENV.API_ENDPOINT + '/testadasPorColaborador', {
                params: {
                    versao: versao
                }
            });
        }
    }
})();
