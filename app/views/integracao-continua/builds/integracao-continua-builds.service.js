(function () {
    'use strict';

    app.service('IntegracaoContinuaBuildsService', IntegracaoContinuaBuildsService);

    /** @ngInject */
    function IntegracaoContinuaBuildsService($http, $resource, ENV) {
        return {
            getRelatorioEntreAsDatasTable: getRelatorioEntreAsDatasTable,
            getStatusUltimosBuild: getStatusUltimosBuild
        };


        function getRelatorioEntreAsDatasTable(dataInicial, dataFinal) {
            return $resource(ENV.API_ENDPOINT + '/relatorioEntreAsDatas', {
                dataInicial: dataInicial,
                dataFinal: dataFinal
            }).query().$promise;
        }

        function getStatusUltimosBuild() {
            return $http.get(ENV.API_ENDPOINT + '/statusUltimosBuild');
        }
    }
})();
