(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('suporte.categorias', {
            url: '/categorias',
            templateUrl: 'views/suporte/categorias/suporte-categorias.html',
            ncyBreadcrumb: {
                label: 'Suporte / Categorias',
                description: ''
            },
            data: { permissao: 'Suporte' }
        });
    }
})();