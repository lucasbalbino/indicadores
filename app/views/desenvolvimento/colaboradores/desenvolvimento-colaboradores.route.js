(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('desenvolvimento.colaboradores', {
            url: '/colaboradores',
            templateUrl: 'views/desenvolvimento/colaboradores/desenvolvimento-colaboradores.html',
            ncyBreadcrumb: {
                label: 'Desenvolvimento / Colaboradores',
                description: ''
            },
            data: { permissao: 'Desenvolvimento' }
        });
    }
})();