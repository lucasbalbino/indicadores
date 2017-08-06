(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('financeiro.contratos', {
            url: '/contratos',
            templateUrl: 'views/financeiro/contratos/financeiro-contratos.html',
            ncyBreadcrumb: {
                label: 'Financeiro / Contratos',
                description: ''
            },
            data: { permissao: 'Financeiro' }
        });
    }
})();