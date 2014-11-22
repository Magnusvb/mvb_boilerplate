module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        src: [
          'src/js/main.js',
          'src/js/plugin.js',
          'src/js/vendor/*.js'
          ],
        dest: 'app/js/main.js'
      },
      dev: {
        src: [
          'src/js/main.js',
          'src/js/plugin.js',
          'src/js/vendor/*.js'
          ],
        dest: 'app/js/main.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'app/js/main.min.js' : ['<%= concat.dev.dest %>']
        }          
      },
      dev: {
        options: {
          compress: false,
          beautify: true,
          mangle: false
        },
        files: {
          'app/js/main.min.js' : ['<%= concat.dev.dest %>']
        }
      }
    },

    sass: {
      dist: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          require: 'susy',
          style: 'compressed'
        },
        files: {
          'app/css/app.min.css' : 'src/scss/app.scss'
        }
      },
      dev: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          require: 'susy',
          style: 'expanded'
        },
        files: {
          'app/css/app.min.css' : 'src/scss/app.scss'
        }
      }
    },

    imagemin: {
      options: {
        optimizationLevel: 5,
        progressive: true,
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'app/img/'
        }]
      },
      dev: {
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'app/img/'
        }]
      }
    },

    browserSync: {
      bsFiles: {
        src : ['app/css/*.css', 'app/*html']
      },
      options: {
        watchTask: true,
        server: {
          baseDir: "app"
        }
      }
    },

    watch: {
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false,
        },
      },
      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass'],
        options: {
          spawn: false,
        },
      },
      imagemin: {
        files: 'src/img/*.{png,jpg,gif}',
        tasks: ['newer:imagemin'],
      },
      files: ['app/*.html', 'src/js/main.js'],
    },
  });

  // Start web server
  // grunt.loadNpmTasks('grunt-contrib-connect');

  // Just check for newer files
  grunt.loadNpmTasks('grunt-newer');

  // Load the sass plugin
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Concat js files
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Minfy images
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Watch changes
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Load Browsersync
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task(s).
  grunt.registerTask('default', [  
    'browserSync',
    'watch',
    'sass', 
    'concat', 
    'uglify', 
    'imagemin'
    ]);
  grunt.registerTask('dev', [  
    'browserSync',
    'watch',
    'sass:dev', 
    'concat:dev', 
    'uglify:dev', 
    'newer:imagemin:dev'
    ]);
  grunt.registerTask('dist', [  
    'sass:dist', 
    'concat:dist', 
    'uglify:dist', 
    'newer:imagemin:dist'
    ]);

};
