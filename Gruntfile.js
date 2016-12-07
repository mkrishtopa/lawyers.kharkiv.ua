module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'ftp-deploy': {
      build: {
        auth: {
          host: 'heddex.biz',
          port: 21,
//          authKey: 'key1'
        },
        forceVerbose: true,
        src: '/home/theo/work/2016.09.30\ -\ Адвокаты\ Дашко\ и\ Чернобай/git/',
        dest: 'SitesRoot/lawyers.kharkiv.ua',
        // authPath: '.ftppass',
        exclusions: [
          // 'path/to/source/folder/**/Thumbs.db',
          '.git',
          'node_modules',
          'assets/scss',
          'assets/js',
          'screenshots',
          '.gitignore',
          'Gruntfile.js',
          'bower.js',
          'package.json'
        ]
      }
    },

    // screenshot: {
    //   default_options: {
    //     options: {
    //       path: 'screenshots',
    //       files: [
    //           {
    //               parallel: true,
    //               // compress: true,
    //               type: 'local',
    //               path: '.',
    //               port: 8080,
    //               src: 'index.html',
    //               dest: 'screenshot.jpg',
    //               // delay: 3000
    //           }
    //       ],
    //       viewport: [
    //         '320x500',
    //         '480x500',
    //         '768x500',
    //         '992x500',
    //         '1200x500',
    //       ] // any (X)x(Y) size
    //     }
    //   }
    // },
    // sass to css
    sass: {
        dist: {
            options: {
//                style: 'compressed',
                lineNumbers: false,
                noCache: true
            },
            files: {
                'assets/dist/styles.css': 'assets/scss/main.scss'
            }
        }
    },
    // concating of css and js
    concat: {
        js : {
            src : [
                'assets/js/*.js'
            ],
            dest : 'assets/dist/all.js'
        }
    },
    // minification of main stylesheet
    cssmin: {
        css: {
            src: 'assets/dist/styles.css',
            dest: 'assets/dist/styles.min.css'
        }
    },
    // minification of main javascript
    uglify: {
        js: {
            files: {
                'assets/dist/all.min.js' : ['assets/dist/all.js']
            },
            drop_debugger : false
        }
    },
    clean: [
        'assets/dist/all.js',
        'assets/dist/styles.css',
        'assets/dist/styles.css',
        'assets/dist/styles.css.map'],
    // watching for changes in files
    watch: {
        files: ['assets/js/**/*.js', 'assets/scss/**/*.scss'],
        tasks: ['dev']
    },
    connect: {
      server: {
        options: {
          port: 9001,
          keepalive: true,
          // livereload: true
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  // grunt.loadNpmTasks('grunt-screenshot');
  grunt.loadNpmTasks('grunt-ftp-deploy');

  // grunt.registerTask('production', 'Makes all.', function() {
    // grunt.task.run(['sass', 'concat', 'cssmin', 'uglify', 'clean', 'wiredep']);
  // });
  grunt.registerTask('dev', 'Dev config', function() {
    grunt.task.run(['sass', 'concat']);
  });
  // grunt.registerTask('connect', 'Start a custom static web server.', function() {
  //   grunt.log.writeln('Starting static web server in "www-root" on port 9001.');
  //   connect(serveStatic('www-root')).listen(9001);
  // });

  grunt.registerTask('default', ['dev']);
  // grunt.registerTask('scr', ['screenshot']);
  grunt.registerTask('deploy', ['ftp-deploy']);

};
