'use strict';

angular.module('app')
    .controller('AppCtrl', [
        '$rootScope', '$localStorage', '$state', '$timeout', '$stateParams',
        function ($rootScope, $localStorage, $state, $timeout, $stateParams) {
            $rootScope.colors = [
                '#3498db',
                '#e74c3c',
                '#f1c40f',
                '#2ecc71',
                '#9b59b6',
                '#1abc9c',
                '#e67e22',
                '#34495e',
                '#2980b9',
                '#c0392b',
                '#f39c12',
                '#27ae60',
                '#8e44ad',
                '#16a085',
                '#d35400',
                '#2c3e50'
            ];

            $rootScope.settings = {
                color: {
                    themeprimary: $rootScope.colors[0],
                    themesecondary: $rootScope.colors[1],
                    themethirdcolor: $rootScope.colors[2],
                    themefourthcolor: $rootScope.colors[3],
                    themefifthcolor: $rootScope.colors[4]
                },
                fixed: {
                    navbar: false,
                    sidebar: false,
                    breadcrumbs: false,
                    header: false
                }
            };
            if (angular.isDefined($localStorage.settings))
                $rootScope.settings = $localStorage.settings;
            else
                $localStorage.settings = $rootScope.settings;

            $rootScope.$watch('settings', function () {
                if ($rootScope.settings.fixed.header) {
                    $rootScope.settings.fixed.navbar = true;
                    $rootScope.settings.fixed.sidebar = true;
                    $rootScope.settings.fixed.breadcrumbs = true;
                }
                if ($rootScope.settings.fixed.breadcrumbs) {
                    $rootScope.settings.fixed.navbar = true;
                    $rootScope.settings.fixed.sidebar = true;
                }
                if ($rootScope.settings.fixed.sidebar) {
                    $rootScope.settings.fixed.navbar = true;


                    //Slim Scrolling for Sidebar Menu in fix state
                    var position = $rootScope.settings.rtl ? 'right' : 'left';
                    if (!$('.page-sidebar').hasClass('menu-compact')) {
                        $('.sidebar-menu').slimscroll({
                            position: position,
                            size: '3px',
                            color: $rootScope.settings.color.themeprimary,
                            height: $(window).height() - 90
                        });
                    }
                } else {
                    if ($(".sidebar-menu").closest("div").hasClass("slimScrollDiv")) {
                        $(".sidebar-menu").slimScroll({destroy: true});
                        $(".sidebar-menu").attr('style', '');
                    }
                }

                $localStorage.settings = $rootScope.settings;

                if (localStorage.getItem("STATUS_ATUALIZACAO") == "true") {
                    $(".refresh").addClass("active");
                }

            }, true);

            $rootScope.$on('$viewContentLoaded',
                function (event, toState, toParams, fromState, fromParams) {
                    if ($state.current.name == 'error404') {
                        $('body').addClass('body-404');
                    }
                    if ($state.current.name == 'error500') {
                        $('body').addClass('body-500');
                    }
                    $timeout(function () {
                        if ($rootScope.settings.fixed.sidebar) {
                            //Slim Scrolling for Sidebar Menu in fix state
                            var position = $rootScope.settings.rtl ? 'right' : 'left';
                            if (!$('.page-sidebar').hasClass('menu-compact')) {
                                $('.sidebar-menu').slimscroll({
                                    position: position,
                                    size: '3px',
                                    color: $rootScope.settings.color.themeprimary,
                                    height: $(window).height() - 90,
                                });
                            }
                        } else {
                            if ($(".sidebar-menu").closest("div").hasClass("slimScrollDiv")) {
                                $(".sidebar-menu").slimScroll({destroy: true});
                                $(".sidebar-menu").attr('style', '');
                            }
                        }
                    }, 500);
                });

            $rootScope.delay = 300000; // 5 minutos

            // Refresh automático
            $(function () {
                setInterval(function () {
                    if ($(".refresh").hasClass("active") && !$(".widget").hasClass("maximized")) {
                        $state.reload();
                    }
                }, $rootScope.delay);
            });
        }
    ]);