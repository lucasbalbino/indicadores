(function () {
    'use strict';

    app.service('DesenvolvimentoSuporteService', DesenvolvimentoSuporteService);

    /** @ngInject */
    function DesenvolvimentoSuporteService($resource, ENV) {
        return {
            getChamadosXAtividadesTable: getChamadosXAtividadesTable
        };


        function getChamadosXAtividadesTable() {
            return $resource(ENV.API_ENDPOINT + '/ChamadosXAtividades').query().$promise;
        }
    }
})();
