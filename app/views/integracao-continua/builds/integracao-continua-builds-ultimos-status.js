(function () {
    'use strict';

    app.controller('CiBuildsUltimosStatusCtrl', CiBuildsUltimosStatusCtrl);

    CiBuildsUltimosStatusCtrl.$inject = ['$scope', '$http', 'ENV']

    function CiBuildsUltimosStatusCtrl($scope, $http, ENV) {
        $scope.statusUltimosBuilds = function() {
            $scope.moment = moment().format('HH:ss');
            $http.get(ENV.API_ENDPOINT + '/statusUltimosBuild').then(function (response) {
                    $scope.dados = response.data;
                }
            );
        };

        $scope.statusUltimosBuilds();
    }
})();