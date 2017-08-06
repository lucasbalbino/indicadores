(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('financeiro.evolucao', {
            url: '/evolucao',
            templateUrl: 'views/financeiro/evolucao/financeiro-evolucao.html',
            ncyBreadcrumb: {
                label: 'Financeiro / Evolução',
                description: ''
            },
            data: { permissao: 'Financeiro' }
        });
    }
})();