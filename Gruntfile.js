module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 9001,
          base: 'app'
        }
      }
    },
    browserSync: {
      bsFiles: {
        src : 'app/css/*.css'
      },
      options: {
        watchTask: true,
        server: {
          baseDir: "app"
        }
      }
    },
    watch: {
      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass'],
      },
      files: ['app/*.html'],
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'script.js',
        dest: 'app/js/script.min.js'
      }
    },

    sass: {
      dev: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          require: 'susy',
          style: 'compact'
        },
        files: {
          'app/css/app.min.css' : 'src/scss/app.scss'
        }
      }
    }
  });

  // Start web server
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Watch changes
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load the sass plugin
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Load Browsersync
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task(s).
  grunt.registerTask('default', ['browserSync', 'watch', 'connect', 'uglify', 'sass' ]);

};
