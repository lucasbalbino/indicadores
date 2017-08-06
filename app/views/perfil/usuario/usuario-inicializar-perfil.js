'use strict';
app
    .controller('UsuInicializarPerfilCtrl', ['$rootScope', '$scope', '$http', 'ENV', '$state', '$timeout',
        function ($rootScope, $scope, $http, ENV, $state, $timeout) {

            $timeout(function() {
                buscarUsuario($rootScope.usuario.usuario);
            }, 1000);

            function buscarUsuario(u) {
                $http.get(ENV.API_ENDPOINT + '/findUsuario', {
                    params: {
                        usuario: u
                    }
                }).then(
                    function (response) {
                        $rootScope.usuario.nome = response.data.nome;
                        $rootScope.usuario.email = response.data.email;
                        $rootScope.usuario.avatar = response.data.avatar;

                        $scope.paginas = listaPaginasComPermissao($rootScope.usuario.permissoes);
                    },
                    function (response) {
                        console.log("ERRO ao buscar usuario", response);
                    }
                );
            }

            function listaPaginasComPermissao(p) {
                var lista = "";
                if (p.includes('dev')) {
                    lista += ' | Desenvolvimento';
                }
                if (p.includes('sup')) {
                    lista += ' | Suporte';
                }
                if (p.includes('ci')) {
                    lista += ' | Integração Contínua';
                }
                if (p.includes('com')) {
                    lista += ' | Comercial';
                }
                if (p.includes('fin')) {
                    lista += ' | Financeiro';
                }
                return lista.substring(2);
            }

            $scope.sair = function () {
                console.log("Saindo do Indicadores");
                $rootScope.usuario = null;
                $state.go('login');
            };
        }]);