(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('desenvolvimento.evolucao', {
            url: '/evolucao',
            templateUrl: 'views/desenvolvimento/evolucao/desenvolvimento-evolucao.html',
            ncyBreadcrumb: {
                label: 'Desenvolvimento / Evolução',
                description: ''
            },
            data: { permissao: 'Desenvolvimento' }
        });
    }
})();