(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('comercial.implantacoes', {
            url: '/implantacoes',
            templateUrl: 'views/suporte/implantacoes/suporte-implantacoes.html',
            ncyBreadcrumb: {
                label: 'Comercial / Implantações',
                description: ''
            }
        });
    }
})();