(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('suporte.implantacoes', {
            url: '/implantacoes',
            templateUrl: 'views/suporte/implantacoes/suporte-implantacoes.html',
            ncyBreadcrumb: {
                label: 'Suporte / Implantações',
                description: ''
            },
            data: { permissao: 'Suporte' }
        });
    }
})();