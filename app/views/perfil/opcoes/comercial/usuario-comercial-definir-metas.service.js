/**
 * Service do modal de metas
 *
 * Created by Isaias Tavares on 15/07/2016.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .service('MetasModalService', MetasModalService);

    /** @ngInject */
    function MetasModalService(ENV, $http) {
        return {
            getMetas: getMetas,
            salvarMetas: salvarMetas
        };

        /**
         * Busca as metas dos Gerentes Comerciais salvas no banco
         *
         * @returns {*}
         *          Promise
         */
        function getMetas() {
            var request = {
                method: 'GET',
                url: ENV.API_ENDPOINT + '/allMetas'
            };
            return $http.get(request.url, request);
        }

        /**
         * Salva as metas dos Gerentes Comerciais
         *
         * @param metas
         *          Array contendo as metas
         * @returns {*}
         *          Promise
         */
        function salvarMetas( metas ) {
            var request = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: ENV.API_ENDPOINT + '/salvarMetas',
                data: metas
            };
            return $http.post(request.url, request.data, request);
        }
    }
})();