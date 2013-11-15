module.exports = function (grunt) {

    "use strict";

    var project = {
        srcDir : 'src/main/ts',
        testDir : 'src/test/ts',
        targetDir : 'target',
        targetTestDir : 'target/test',
        name : '<%= pkg.name %>',
        version : '<%= pkg.version %>',
        extension : 'ts'
    }
    project.targetJs = project.targetDir + '/' + project.name + '-' + project.version + '.js';
    project.targetJsMin = project.targetDir + '/' + project.name + '-' + project.version + '.min.js';
    project.targetTestJs = project.targetTestDir + '/' + project.name + '-test-' + project.version + '.js';


    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean:{
            target:[ project.targetDir,'_SpecRunner.html', project.srcDir + '/**/*.js', project.srcDir + '/**/*.js.map',
                project.srcDir + '/**/*.html', project.testDir + '/**/*.js',  project.testDir + '/**/*.js.map',
                project.testDir + '/**/*.html' ]
        },

        typescript: {
            base: {
                src: [project.srcDir + '/*.ts'],
                dest: project.targetJs
            },
            test: {
                src: project.testDir + '/*.ts',
                dest: project.targetTestJs
            },
            options: {
                module: 'AMD',
                target: 'ES5',
                base_path: project.srcDir,
                sourcemap: true,
                declaration: true
            }
        },

        jasmine: {
            src: project.targetTestJs
        },

        uglify: {
            options: {
                banner: '/*! ' +  project.name + ' */\n'
            },
            build: {
                src: project.targetJs,
                dest: project.targetJsMin
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask("compile", ["clean", "typescript"]);
    grunt.registerTask("test", ["compile", "jasmine"]);
    grunt.registerTask("package", ["test", "uglify"]);
    grunt.registerTask("default", ["package"]);

};