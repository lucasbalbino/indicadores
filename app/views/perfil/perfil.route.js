(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('usuario.perfil', {
            url: '/perfil',
            templateUrl: 'views/perfil/perfil.html',
            ncyBreadcrumb: {
                label: 'Oobj Indicadores / Perfil',
                description: ''
            }
        });
    }
})();