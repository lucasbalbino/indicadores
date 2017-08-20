(function () {
    'use strict';

    app.service('DevAdicionarBacklogService', DevAdicionarBacklogService);

    /** @ngInject */
    function DevAdicionarBacklogService($http, ENV) {
        return {
            inserirBacklogDesenvolvimento: inserirBacklogDesenvolvimento
        };


        function inserirBacklogDesenvolvimento(dataFinal, quantidade, versao) {
            return $http.get(ENV.API_ENDPOINT + '/inserirBacklogDesenvolvimento', {
                params: {
                    dataFinal: dataFinal,
                    quantidade: quantidade,
                    versao: versao
                }
            });
        }
    }
})();
