angular.module('app')
    .directive('fullscreen', function() {
            return {
                restrict: 'AC',
                template: '<i class="fa fa-arrows-alt"></i>',
                link: function(scope, el, attr) {
                    el.on('click', function() {
                        var element = document.documentElement;
                        if (!$('body')
                            .hasClass("full-screen")) {

                            $('body')
                                .addClass("full-screen");
                            $('#fullscreen-toggler')
                                .addClass("active");
                            if (element.requestFullscreen) {
                                element.requestFullscreen();
                            } else if (element.mozRequestFullScreen) {
                                element.mozRequestFullScreen();
                            } else if (element.webkitRequestFullscreen) {
                                element.webkitRequestFullscreen();
                            } else if (element.msRequestFullscreen) {
                                element.msRequestFullscreen();
                            }

                        } else {

                            $('body').removeClass("full-screen");
                            el.removeClass("active");

                            if (document.exitFullscreen) {
                                document.exitFullscreen();
                            } else if (document.mozCancelFullScreen) {
                                document.mozCancelFullScreen();
                            } else if (document.webkitExitFullscreen) {
                                document.webkitExitFullscreen();
                            }

                        }
                    });
                }
            };
        }
    );

angular.module('app')
    .directive('refresh', [
        '$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {
            return {
                restrict: 'AC',
                template: '<i class="fa fa-refresh"></i>',
                link: function(scope, el, attr) {
                    var clicks = 0, timer = null;

                    el.on('click', function() {
                        clicks++;  //count clicks

                        if(clicks === 1) {

                            timer = setTimeout(function() {

                                $state.reload();

                                clicks = 0;
                            }, 500);
                        } else {
                            clearTimeout(timer);

                            $(".refresh").toggleClass("active");

                            clicks = 0;
                        }
                    })
                        .on("dblclick", function(e){
                            e.preventDefault();
                        });
                }
            };
        }
    ]);

angular.module('app')
    .directive('sidebarToggler', function() {
            return {
                restrict: 'AC',
                template: '<i class="fa fa-arrows-h"></i>',
                link: function(scope, el, attr) {
                    el.on('click', function() {
                        $("#sidebar").toggleClass("hide");
                        el.toggleClass("active");
                        return false;
                    });
                }
            };
        }
    );

angular.module('app')
    .directive('pageTitle', [
        '$rootScope', '$timeout',
        function($rootScope, $timeout) {
            return {
                link: function(scope, element) {

                    var listener = function(event, toState) {
                        var title = 'Default Title';
                        if (toState.ncyBreadcrumb && toState.ncyBreadcrumb.label) title = toState.ncyBreadcrumb.label;
                        $timeout(function() {
                            element.text("Indicadores / " + title);
                        }, 0, false);
                    };
                    $rootScope.$on('$stateChangeSuccess', listener);
                }
            };
        }
    ]);

angular.module('app')
    .directive('headerTitle', [
        '$rootScope', '$timeout',
        function ($rootScope, $timeout) {
            return {
                link: function (scope, element) {

                    var listener = function (event, toState) {
                        var title = 'Default Title';
                        var description = '';
                        if (toState.ncyBreadcrumb && toState.ncyBreadcrumb.label) title = toState.ncyBreadcrumb.label;
                        if (toState.ncyBreadcrumb && toState.ncyBreadcrumb.description) description = toState.ncyBreadcrumb.description;
                        $timeout(function () {
                            if(description == '')
                                element.text(title);
                            else 
                                element.html(title + ' <small> <i class="fa fa-angle-right"> </i> '+ description + ' </small>');
                        }, 0, false);
                    };
                    $rootScope.$on('$stateChangeSuccess', listener);
                }
            };
        }
    ]);