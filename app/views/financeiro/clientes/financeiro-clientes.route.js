(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('financeiro.clientes', {
            url: '/clientes',
            templateUrl: 'views/financeiro/clientes/financeiro-clientes.html',
            ncyBreadcrumb: {
                label: 'Financeiro / Clientes',
                description: ''
            },
            data: { permissao: 'Financeiro' }
        });
    }
})();