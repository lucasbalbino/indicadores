(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('suporte.desenvolvimento', {
            url: '/desenvolvimento',
            templateUrl: 'views/desenvolvimento/suporte/desenvolvimento-suporte.html',
            ncyBreadcrumb: {
                label: 'Suporte / Desenvolvimento',
                description: ''
            },
            data: { permissao: 'Suporte' }
        });
    }
})();