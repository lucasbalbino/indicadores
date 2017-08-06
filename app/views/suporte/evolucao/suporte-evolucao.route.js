(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('suporte.evolucao', {
            url: '/evolucao',
            templateUrl: 'views/suporte/evolucao/suporte-evolucao.html',
            ncyBreadcrumb: {
                label: 'Suporte / Evolução',
                description: ''
            },
            data: { permissao: 'Suporte' }
        });
    }
})();