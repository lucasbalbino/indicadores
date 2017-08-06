(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('integracao-continua.builds', {
            url: '/builds',
            templateUrl: 'views/integracao-continua/builds/integracao-continua-builds.html',
            ncyBreadcrumb: {
                label: 'Integração Contínua / Builds',
                description: ''
            },
            data: { permissao: 'DevOps' }
        });
    }
})();