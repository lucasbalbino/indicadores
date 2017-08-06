(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('comercial.oportunidades', {
            url: '/oportunidades',
            templateUrl: 'views/comercial/oportunidades/comercial-oportunidades.html',
            ncyBreadcrumb: {
                label: 'Comercial / Oportunidades',
                description: ''
            }
        });
    }
})();