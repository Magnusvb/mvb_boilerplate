module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // connect: {
    //   server: {
    //     options: {
    //       port: 9001,
    //       base: 'app'
    //     }
    //   }
    // },

    watch: {
      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass'],
      },
      files: ['app/*.html', 'src/js/main.js'],
    },

    concat: {
      options: {
        separator: '§§§',
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['src/js/*.js', 'src/**/*.js'],
        dest: 'src/js/script.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'main.js',
        dest: 'app/js/script.min.js'
      }
    },

    sass: {
      dev: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
          require: 'susy',
          style: 'compressed'
        },
        files: {
          'app/css/app.min.css' : 'src/scss/app.scss'
        }
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
    }
  });

  // Start web server
  grunt.loadNpmTasks('grunt-contrib-connect');

  

  // Load the sass plugin
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Concat js files
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Watch changes
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Load Browsersync
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task(s).
  grunt.registerTask('default', [  
    'browserSync',
    'watch',
    'sass', 
    'connect', 
    'uglify', 
    'concat',
    ]);

};
