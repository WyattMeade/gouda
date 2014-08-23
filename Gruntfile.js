module.exports = function(grunt) {
    'use strict';
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Load path
    var path = require('path');
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    // Define the configuration for all the tasks
    grunt.initConfig({
        // Project settings
        config: {
            // Configurable paths
            app: 'dev',
            dist: 'demo'
        },
        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= config.app %>/js/{,*/}*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            styles: {
                files: ['<%= config.app %>/css/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer'],
                options: {
                    livereload: true
                }
            },
            handlebars: {
                files: ['<%= config.app %>/js/templates/**/*.hbs'],
                tasks: ['handlebars'],
                options: {
                    livereload: true
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: ['<%= config.app %>/{,*/}*.html', '.tmp/css/{,*/}*.css', '<%= config.app %>/images/{,*/}*']
            }
        },
        handlebars: {
            compile: {
                files: {
                    "<%= config.app %>/js/templates/compiled.js": ["<%= config.app %>/js/templates/**/*.hbs"]
                },
                options: {
                    namespace: 'Handlebars.templates',
                    wrapped: true,
                    processName: function(filename) {
                        return filename.substring(filename.lastIndexOf('/')+1, filename.length - 4);
                    }
                }
            }
        },
        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: ['.tmp', '<%= config.app %>']
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: ['.tmp', 'test', '<%= config.app %>']
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= config.dist %>',
                    livereload: false
                }
            }
        },
        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: ['.tmp', '<%= config.dist %>/*', '!<%= config.dist %>/.git*']
                }]
            },
            server: '.tmp'
        },
        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/js/{,*/}*.js',
                '!<%= config.app %>/js/vendor/*',
                '!<%= config.app %>/js/templates/*',
                'test/spec/{,*/}*.js'
            ]
        },
        // Jasmine testing framework configuration options
        jasmine: {
            all: {
                options: {
                    specs: 'test/spec/{,*/}*.js'
                }
            }
        },
        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/css/',
                    src: '{,*/}*.css',
                    dest: '.tmp/css/'
                }]
            }
        },
        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.app %>/index.html'
        },
        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/css/{,*/}*.css']
        },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: ['*.{ico,png,txt}', '.htaccess', 'images/{,*/}*.webp', '{,*/}*.html', 'fonts/{,*/}*.*']
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/styles',
                dest: '.tmp/css/',
                src: '{,*/}*.css'
            }
        },
        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: ['copy:styles', 'handlebars'],
            test: ['copy:styles'],
            dist: ['copy:styles']
        }
    });
    grunt.registerTask('serve', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }
        grunt.task.run(['clean:server', 'concurrent:server', 'autoprefixer', 'connect:livereload', 'watch']);
    });

    grunt.registerTask('build', ['clean:dist', 'useminPrepare', 'concurrent:dist', 'autoprefixer', 'concat', 'cssmin', 'uglify', 'copy:dist', 'usemin', 'htmlmin']);
};