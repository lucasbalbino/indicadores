(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('suporte.colaboradores', {
            url: '/colaboradores',
            templateUrl: 'views/suporte/colaboradores/suporte-colaboradores.html',
            ncyBreadcrumb: {
                label: 'Suporte / Colaboradores',
                description: ''
            },
            data: { permissao: 'Suporte' }
        });
    }
})();