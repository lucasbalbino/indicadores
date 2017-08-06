(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('desenvolvimento.suporte', {
            url: '/suporte',
            templateUrl: 'views/desenvolvimento/suporte/desenvolvimento-suporte.html',
            ncyBreadcrumb: {
                label: 'Desenvolvimento / Suporte',
                description: ''
            },
            data: { permissao: 'Desenvolvimento' }
        });
    }
})();