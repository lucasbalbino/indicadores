/**
 * Created by Rhuan on 17/06/2016.
 */
module.exports = function (grunt) {

    grunt.initConfig({
        clean: {
            build: ['dist/js/libs.js', 'dist/js/scripts.js', 'dist/js/all.js'],
            tudo: ['dist/*']
        },
        jshint: {
            dist: {
                src: [
                    'app/js/constants/**/*.js',
                    'app/js/controllers/**/*.js',
                    'app/js/app.js',
                    'app/js/config.js',
                    'app/js/config.router.js',
                    'app/js/utils.js',
                    'app/modules/**/*.js',
                    'app/views/**/*.js',
                    'app/js/directives/agora.js',
                    'app/js/directives/stats/stats-desenvolvimento.js',
                    'app/js/directives/stats/stats-suporte.js',
                    'app/js/directives/stats/stats-integracao-continua.js',
                    'Gruntfile.js'
                ]
            }
        },
        concat: {
            dep_internas: {
                src: [
                    'app/js/**/*.js',
                    'app/modules/**/*.js',
                    'app/views/**/*.js',
                ],
                dest: 'dist/js/scripts.js'
            },
            dep_externas: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/datatables.net/js/jquery.dataTables.min.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-locale-pt-br/angular-locale_pt-br.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'bower_components/angular-animate/angular-animate.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.min.js',
                    'bower_components/angular-touch/angular-touch.min.js',
                    'bower_components/angular-cookies/angular-cookies.min.js',
                    'bower_components/angular-ui-select/dist/select.min.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'bower_components/angular-resource/angular-resource.min.js',
                    'bower_components/moment/min/moment-with-locales.js',
                    'bower_components/moment-range/dist/moment-range.min.js',
                    'bower_components/bootstrap-daterangepicker/daterangepicker.js',
                    'bower_components/angular-daterangepicker/js/angular-daterangepicker.min.js',
                    'bower_components/datatables.net-buttons/js/dataTables.buttons.min.js',
                    'bower_components/datatables.net-buttons/js/buttons.flash.min.js',
                    'bower_components/datatables.net-buttons/js/buttons.html5.min.js',
                    'bower_components/datatables.net-buttons/js/buttons.print.min.js',
                    'bower_components/angular-datatables/dist/angular-datatables.min.js',
                    'bower_components/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.js',
                    'bower_components/angular-breadcrumb/dist/angular-breadcrumb.min.js',
                    'bower_components/amcharts/dist/amcharts/amcharts.js',
                    'bower_components/amcharts/dist/amcharts/serial.js',
                    'bower_components/amcharts/dist/amcharts/pie.js',
                    'bower_components/amcharts/dist/amcharts/gauge.js',
                    'bower_components/amcharts/dist/amcharts/themes/light.js',
                    'bower_components/amcharts/dist/amcharts/lang/pt.js',
                    'bower_components/amcharts/dist/amcharts/plugins/responsive/responsive.js',
                    'bower_components/amcharts/dist/amcharts/plugins/export/export.js',
                    'bower_components/ammap3/ammap/ammap.js',
                    'bower_components/ammap3/ammap/maps/js/brazilLow.js',
                    'bower_components/ng-file-upload/ng-file-upload-shim.min.js',
                    'bower_components/ng-file-upload/ng-file-upload-all.min.js',
                    'bower_components/ng-file-upload/ng-file-upload.min.js',
                    'bower_components/ng-img-crop/compile/minified/ng-img-crop.js',
                    'bower_components/bootstrap-select/dist/js/bootstrap-select.min.js',
                    'bower_components/pdfmake/build/pdfmake.js',
                    'bower_components/pdfmake/build/vfs_fonts.js',
                    'bower_components/ngstorage/ngStorage.min.js',
                    'js/controllers/daterangepicker.js',
                    'js/controllers/datetime-moment.js',
                    'js/controllers/brazilian-currency.js',
                    'js/controllers/utilities.js',
                    'js/controllers/indicadores-utils.js'
                ],
                dest: 'dist/js/libs.js'
            },
            tudo: {
                src: [
                    'dist/js/libs.js',
                    'dist/js/scripts.js'
                ],
                dest: 'dist/js/all.min.js'
            }
        },
        uglify: {
            scripts: {
                files: {
                    'dist/js/all.min.js': ['dist/js/all.js']
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'dist/css/styles.min.css': [
                        'bower_components/bootstrap/dist/css/bootstrap.min.css',
                        'bower_components/angular/angular-csp.css',
                        'bower_components/angular-ui-select/dist/select.min.css',
                        'bower_components/animate.css/animate.min.css',
                        'bower_components/font-awesome/css/font-awesome.min.css',
                        'bower_components/bootstrap-select/dist/css/bootstrap-select.min.css',
                        'bower_components/bootstrap-daterangepicker/daterangepicker.css',
                        'bower_components/ng-img-crop/compile/minified/ng-img-crop.css',
                        'bower_components/amcharts/dist/amcharts/plugins/export/export.css',
                        'bower_components/datatables.net-dt/css/jquery.dataTables.min.css',
                        'bower_components/datatables.net-buttons-dt/css/buttons.dataTables.min.css',
                        'app/css/style.css',
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    // collapseBooleanAttributes: true,
                    // removeOptionalTags: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['**/*.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        processhtml: {
            dist: {
                files: {
                    'dist/index.html': ['app/index.html']
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['images/**'],
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/font-awesome',
                        src: ['fonts/*.*'],
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist',
                        src: ['fonts/*.*'],
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/amcharts/dist/amcharts/plugins/export',
                        src: ['libs/**/*'],
                        dest: 'dist/amcharts/plugins/export/'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/amcharts/dist/amcharts/',
                        src: ['images/*.*'],
                        dest: 'dist/amcharts/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.registerTask('prod', [
        'clean:tudo',
        // 'jshint',
        'concat:dep_internas',
        'concat:dep_externas',
        'concat:tudo',
        'uglify',
        'cssmin',
        'htmlmin',
        'processhtml',
        'copy',
        'clean:build'
    ]);

    grunt.registerTask('teste', [
        'processhtml'
    ]);

};