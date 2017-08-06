'use strict';
angular.module('app')
    .run(
        [
            '$rootScope', '$cookieStore', '$http', '$state', '$stateParams', '$timeout', 'ENV',
            function($rootScope, $cookieStore, $http, $state, $stateParams, $timeout, ENV) {
                $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
                    if (toState.data.requireLogin) {
                        var permissoes = [];
                        var dadosAutorizacao = $cookieStore.get('Authorization');
                        var temPermissao = false;

                        if (angular.isDefined(dadosAutorizacao)) {
                            verificarPermissao(
                                function () {
                                    permissoes = permissoes[0];

                                    if(toState.name.includes("usuario")) {
                                        temPermissao = true;
                                    }
                                    else {
                                        for (var i = 0; i < permissoes.length; i++) {
                                            // CORRIGIR ESTA PARTE NO BACKEND - INICIO
                                            if(permissoes[i] === 'dev') {
                                                permissoes[i] = 'desenvolvimento';
                                            } else if(permissoes[i] === 'ci') {
                                                permissoes[i] = 'integracao-continua';
                                            }
                                            // CORRIGIR ESTA PARTE NO BACKEND - FIM

                                            if (toState.name.includes(permissoes[i])) {
                                                temPermissao = true;
                                            }
                                        }
                                    }

                                    if (!temPermissao) {
                                        if(fromState.name == 'erro.404' || toState.name == 'erro.404')
                                            event.preventDefault();

                                        $state.go('erro.404');
                                    }
                                }
                            );
                        } else {
                            $timeout(function() {
                                $state.go("login");
                            });
                        }
                    }

                    function verificarPermissao(callback) {
                        $http.get(ENV.API_ENDPOINT + '/temPermissao', {
                            params: {
                                grupos: dadosAutorizacao.grupos
                            }
                        }).then(function (response) {
                            permissoes = response.data;

                            if(!angular.isDefined($rootScope.usuario) || $rootScope.usuario == null) {
                                $rootScope.usuario = {
                                    usuario: dadosAutorizacao.usuario,
                                    grupos: dadosAutorizacao.grupos,
                                    permissoes: permissoes[0]
                                }
                            }
                            callback();
                        });
                    };
                })
            }
        ]
    )
    .config(
        [
            '$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise('/login');
                $stateProvider
                    .state('login', {
                        url: '/login',
                        templateUrl: 'modules/autenticacao/views/login.html',
                        ncyBreadcrumb: {
                            label: 'Login'
                        },
                        data: {
                            requireLogin: false
                        }
                    })
                    .state('erro', {
                        abstract: true,
                        url: '/erro',
                        templateUrl: 'views/layout.html',
                        data: {
                            requireLogin: false
                        }
                    })
                    .state('erro.404', {
                        url: '/404',
                        templateUrl: 'views/404.html',
                        ncyBreadcrumb: {
                            label: '404'
                        },
                        data: {
                            requireLogin: false
                        }
                    })
                    .state('desenvolvimento', {
                        abstract: true,
                        url: '/desenvolvimento',
                        templateUrl: 'views/layout.html',
                        data: {
                            requireLogin: true,
                            permissao: 'Suporte'
                        }
                    })
                    .state('suporte', {
                        abstract: true,
                        url: '/suporte',
                        templateUrl: 'views/layout.html',
                        data: {
                            requireLogin: true
                        }
                    })
                    .state('ev', {
                        abstract: true,
                        url: '/ev',
                        templateUrl: 'views/layout.html'
                    })
                    .state('integracao-continua', {
                        abstract: true,
                        url: '/integracao-continua',
                        templateUrl: 'views/layout.html',
                        data: {
                            requireLogin: true
                        }
                    })
                    .state('comercial', {
                        abstract: true,
                        url: '/comercial',
                        templateUrl: 'views/layout.html',
                        data: {
                            requireLogin: true
                        }
                    })
                    .state('financeiro', {
                        abstract: true,
                        url: '/financeiro',
                        templateUrl: 'views/layout.html',
                        data: {
                            requireLogin: true
                        }
                    })
                    .state('usuario', {
                        abstract: true,
                        url: '/usuario',
                        templateUrl: 'views/layout.html',
                        data: {
                            requireLogin: true
                        }
                    });
            }
        ]
    );