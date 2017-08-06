(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('suporte.clientes', {
            url: '/clientes',
            templateUrl: 'views/comercial/clientes/comercial-clientes.html',
            ncyBreadcrumb: {
                label: 'Suporte / Clientes',
                description: ''
            }
        });
    }
})();