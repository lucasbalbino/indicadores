(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('desenvolvimento.atividades', {
            url: '/atividades',
            templateUrl: 'views/desenvolvimento/atividades/desenvolvimento-atividades.html',
            ncyBreadcrumb: {
                label: 'Desenvolvimento / Atividades',
                description: ''
            },
            data: { permissao: 'Desenvolvimento' }
        });
    }
})();