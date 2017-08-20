(function () {
    'use strict';

    app.controller('CiBuildsUltimosStatusCtrl', CiBuildsUltimosStatusCtrl);

    /** @ngInject */
    function CiBuildsUltimosStatusCtrl($scope, IntegracaoContinuaBuildsService) {

        $scope.statusUltimosBuilds = function() {

            $scope.moment = moment().format('HH:ss');

            IntegracaoContinuaBuildsService.getStatusUltimosBuild().then(function (response) {
                    $scope.dados = response.data;
                }
            );
        };

        $scope.statusUltimosBuilds();
    }
})();