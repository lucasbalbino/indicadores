(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config($stateProvider) {

        $stateProvider.state('suporte.avaliacao', {
            url: '/avaliacao',
            templateUrl: 'views/suporte/avaliacao/suporte-avaliacao.html',
            ncyBreadcrumb: {
                label: 'Suporte / Avaliação',
                description: ''
            },
            data: { permissao: 'Suporte' }
        });
    }
})();