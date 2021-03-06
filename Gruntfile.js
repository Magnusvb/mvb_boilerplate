module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        src: [
          'src/js/modernizr-2.8.3.js',
          'src/js/plugin.js',
          'src/js/main.js'
        ],
        dest: 'app/js/main.min.js'
      },
      dev: {
        src: [
          'src/js/modernizr-2.8.3.js',
          'src/js/plugin.js',
          'src/js/main.js'
        ],
        dest: 'app/js/main.min.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'app/js/main.min.js': ['<%= concat.dist.dest %>']
        }
      },
      dev: {
        options: {
          compress: false,
          beautify: true,
          mangle: false
        },
        files: {
          'app/js/main.min.js': ['<%= concat.dev.dest %>']
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
          'app/css/app.min.css': 'src/scss/app.scss'
        }
      },
      dev: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          require: 'susy',
          style: 'expanded'
        },
        files: {
          'app/css/app.min.css': 'src/scss/app.scss'
        }
      }
    },

    imagemin: {
      options: {
        optimizationLevel: 5,
        progressive: true
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
        src: ['app/css/*.css', 'app/*html']
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
          spawn: false
        }
      },
      sass: {
        files: 'src/scss/**',
        tasks: ['sass'],
        options: {
          spawn: false
        }
      },
      imagemin: {
        files: 'src/img/*.{png,jpg,gif}',
        tasks: ['newer:imagemin:dev']
      },
      files: ['app/*.html', 'src/js/main.js']
    }
  });

  // Start web server
  // grunt.loadNpmTasks('grunt-contrib-connect');

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
  
  // Just check for newer files
  grunt.loadNpmTasks('grunt-newer');

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