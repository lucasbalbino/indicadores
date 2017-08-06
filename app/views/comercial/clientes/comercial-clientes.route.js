(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('comercial.clientes', {
            url: '/clientes',
            templateUrl: 'views/comercial/clientes/comercial-clientes.html',
            ncyBreadcrumb: {
                label: 'Comercial / Clientes',
                description: ''
            },
            data: { permissao: 'Comercial' }
        });
    }
})();