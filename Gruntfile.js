/**
 * Created by ravi on 11/6/14.
 */
module.exports = function(grunt){
    (require('load-grunt-tasks'))(grunt);
    grunt.registerTask('serve',['connect:server']);
    grunt.registerTask('build',['bower','concurrent:build']);
    grunt.registerTask('default',['build','concurrent:mini']);
    grunt.registerTask('all',['bower','default']);
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        bower: {
            install:{
                options:{
                    targetDir: 'build/lib',
                    cleanTargetDir:true
                }
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: true
            },
            lint: ['Gruntfile.js', 'src/js/*.js','spec/*_spec.js']
        },
        karma: {
            spec: {
                configFile: 'karma.conf.js',
                autoWatch: true
            },
            singleRun: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        copy:{
            main:{
                files:[
                    {expand:true,src:['src/**/*.html'],dest:'build/'}
                ]
            }
        },
        cssmin:{
            combine:{
                files:{
                    'build/css/lib.min.css': ['build/lib/**/*.css'],
                    'build/css/all.min.css':['src/**/*.css']
                }
            }
        },

        uglify:{
            options:{
                mangle:false,
                verbose:true
            },
            lib:{
                files:{
                    'build/js/lib.min.js':['build/lib/jquery/jquery.js','build/lib/bootstrap/bootstrap.js', 'build/lib/lodash/lodash.compat.js'],
                    'build/js/all.min.js' : ['src/js/*.js']
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    keepalive: true,
                    livereload: true,
                    base: ['build/html', 'build/js', 'build/css', 'src/', 'src/js', 'src/css']
                }
            }
        },
        watch: {
            jsfiles: {
                files: ['src/js/*.js'],
                tasks: ['jshint']
            },
            htmlCssJs: {
                files: ['src/js/*.js', 'src/**/*.html', 'src/**/*.css'],
                tasks: ['cssmin','uglify']
            },
            configFiles:{
                files:['Gruntfile.js','karma.conf.js'],
                options:{
                    reload:true
                }
            },
            options: {
                spawn: true,
                livereload: true
            }
        },
        concurrent: {
            build: ['newer:cssmin', 'newer:uglify', 'newer:jshint','newer:copy'],
            mini: ['serve', 'watch','karma:spec'],
            options: {
                logConcurrentOutput: true
            }
        }
    });
};