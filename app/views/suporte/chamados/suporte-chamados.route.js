(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('suporte.chamados', {
            url: '/chamados',
            templateUrl: 'views/suporte/chamados/suporte-chamados.html',
            ncyBreadcrumb: {
                label: 'Suporte / Chamados',
                description: ''
            }
        });
    }
})();