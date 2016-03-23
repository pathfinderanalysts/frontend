'use strict';

module.exports = function (grunt) {

    require('time-grunt')(grunt);

    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        build: 'build'
    };

    grunt.initConfig({

        yeoman: appConfig,

        less: {
            css: {
                files: {
                    '<%= yeoman.build %>/styles/importer.css': 'src/assets/styles/importer.less'
                }
            }
        },

        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    'build/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729
            },
            build: {
                options: {
                    open: true,
                    base: '<%= yeoman.build %>'
                }
            }
        },

        clean: {
            build: {
                src: ['<%= yeoman.build %>']
            }
        },

        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.build %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        cssmin: {
            minify: {
                src: '<%= yeoman.build %>/styles/importer.css',
                dest: '<%= yeoman.build %>/styles/importer.min.css'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/images/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: '<%= yeoman.build %>/images'
                }]
            }
        },

        copy: {
            build: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.build %>',
                    src: [
                        '*.{ico,png,txt}',
                        '*.html',
                        'images/{,*/}*.{webp}',
                        'styles/fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.build %>/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: 'bower_components/bootstrap/build',
                    src: 'fonts/*',
                    dest: '<%= yeoman.build %>'
                }, {
                    expand: true,
                    cwd: 'src/assets/styles',
                    src: ['**/*.css'],
                    dest: '<%= yeoman.build %>/styles'
                }, {
                    expand: true,
                    cwd: 'src/views',
                    src: ['**/*.html'],
                    dest: '<%= yeoman.build %>/views'
                }, {
                    expand: true,
                    cwd: 'src/views',
                    src: ['index.html'],
                    dest: '<%= yeoman.build %>'
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        concat: {
            build: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-animate/angular-animate.min.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'bower_components/angular-cookies/angular-cookies.min.js',
                    'bower_components/angular-resource/angular-resource.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.min.js',
                    'bower_components/angular-touch/angular-touch.min.js',
                    'src/app/app.js',
                    'src/app/controllers/*.js'
                ],
                dest: '<%= yeoman.build %>/js/built.min.js'
            }
        },

        concurrent: {
            server: [
                'copy:styles'
            ],
            build: [
                'copy:styles',
                'imagemin'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'build') {
            return grunt.task.run(['build', 'connect:build:keepalive']);
        }

        grunt.task.run([
            'concurrent:server',
            'connect:build',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('build', [
        'clean:build',
        'useminPrepare',
        'concurrent:build',
        'concat',
        'copy:build',
        'cssmin'
    ]);

    grunt.registerTask('default', [
        'build',
        'less:css',
        'copy'
    ]);
};
