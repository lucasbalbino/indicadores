(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('financeiro.faturamento', {
            url: '/faturamento',
            templateUrl: 'views/financeiro/faturamento/financeiro-faturamento.html',
            ncyBreadcrumb: {
                label: 'Financeiro / Faturamento',
                description: ''
            },
            data: { permissao: 'Financeiro' }
        });
    }
})();