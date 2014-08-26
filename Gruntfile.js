/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    ' */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      }
    },
    uglify: {
      vendor: {
        options: {
          mangle: false,
          report: 'min' // or 'gzip'
        },
        files: grunt.file.expandMapping(['*.js'], 'public/javascript/', {
          cwd: 'vendor/',
          rename: function(base, path) {
            return base + path.replace(/\.js$/, '.min.js');
          }
        })
      },
      vendorDev: {
        options: {
          mangle: false,
          report: 'min' // or 'gzip'
        },
        files: grunt.file.expandMapping(['*.js'], 'dev/javascript/', {
          cwd: 'vendor/',
          rename: function(base, path) {
            return base + path.replace(/\.js$/, '.min.js');
          }
        })
      },
      scripts: {
        options: {
          banner: '<%= banner %>',
          mangle: false,
          report: 'min' // or 'gzip'
        },
        files: grunt.file.expandMapping(['*.js'], 'public/javascript/', {
          cwd: 'src/',
          rename: function(base, path) {
            return base + path.replace(/\.js$/, '.min.js');
          }
        })
      }
    },
    copy: {
      js: {
        files: [
        {src: ['src/mmgd.js'], dest: 'dev/javascript/mmgd.min.js'},
        ]
      },
      images: {
        files: [
        {expand: true, cwd: 'public/images/', src: ['**'], dest: 'dev/images'},
        ]
      },
      html: {
        files: [
        {expand: true, cwd: 'src/', src: ['*.html'], dest: 'dev/'},
        ]
      },
      jsonenUS: {
        files: [
        {src: ['src/locale/index-US.json'], dest: 'src/locale/index-en.json'},
        ]
      },
      json: {
        files: [
        {expand: true, cwd: 'src/locale/', src: ['*.json'], dest: 'dev/locale/'},
        ]
      },
      jsonPublic: {
        files: [
        {expand: true, cwd: 'src/locale/', src: ['*.json'], dest: 'public/locale/'},
        ]
      },
      skrollrCSSPublic: {
        files: [
        {src: ['src/skrollr.blank.css'], dest: 'public/stylesheets/skrollr.css'},
        ]
      },
      skrollrCSSDev: {
        files: [
        {src: ['src/skrollr.blank.css'], dest: 'dev/stylesheets/skrollr.css'},
        ]
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded',
          // loadPath: require('node-bourbon').with('other/path', 'another/path')
          // - or -
          // loadPath: require('node-bourbon').includePaths
        },
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['*.scss'],
          dest: 'src/',
          ext: '.blank.css'
        }]
      }
    },
    autoprefixer: {
      dist: {
        options: {
          browsers: ['last 2 version', 'ie 9']  // Task-specific options go here.
        },
        files: {
          'public/stylesheets/mmgd.prefixed.css': 'src/mmgd.blank.css',
          'dev/stylesheets/mmgd.prefixed.css': 'src/mmgd.blank.css'
        }
      }
    },
    jshint: {
      files: [ 'Gruntfile.js','src/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        '-W098': true,
        '-W117': true,
        globals: {
          "jQuery": false,
          "$": false
        },
      }
    },
    svgmin: {
      options: {
        plugins: [
        { removeViewBox: false },
        { removeUselessStrokeAndFill: true },
        { convertPathData: { straightCurves: false }}]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/assets',
          src: ['**/*.svg','*.svg'],
          dest: 'public/',
          ext: '.min.svg'
        }]
      },
      dev: {
        files: [{
          expand: true,
          cwd: 'src/assets',
          src: ['**/*.svg','*.svg'],
          dest: 'dev/',
          ext: '.min.svg'
        }]
      }
    },
    haml: {
      one: {
        files: grunt.file.expandMapping(['*.haml'], 'src/', {
          cwd: 'src/',
          rename: function(base, path) {
            return base + path.replace(/\.haml$/, '.html');
          }
        })
      }
    },
    htmlcompressor: {
      compile: {
        files: grunt.file.expandMapping(['*.html'], 'public/', {
          cwd: 'src/',
          rename: function(base, path) {
            return base + path.replace(/\.html$/, '.html');
          },
          options: {
            type: 'html',
            preserveServerScript: true
          }
        })
      }
    },
    watch: {
      options: {
        dateFormat: function(time) {
          grunt.log.writeln('mmgd watcher finished in ' + time + 'ms at ' + (new Date()).toString());
          grunt.log.writeln('Waiting for more changes, come on now :)');
        },
      },
      sass: {
        files: ['src/*.scss'],
        tasks: ['sass', 'autoprefixer']
      },
      scripts: {
        files: [ 'Gruntfile.js','src/*.js'],
        tasks: ['jshint', 'uglify:scripts', 'copy:js'],
        options: {
          spawn: false
        }
      },
      copy: {
        files: ['public/images/**'],
        tasks: ['copy:images']
      },
      copy_enUS: {
        files: ['src/locale/index-US.json'],
        tasks: ['copy:jsonenUS']
      },
      copy_json: {
        files: ['src/locale/*.json'],
        tasks: ['copy:json']
      },
      copy_jsonPublic: {
        files: ['src/locale/*.json'],
        tasks: ['copy:jsonPublic']
      },
      copy_scrollr: {
        files: ['src/skrollr.blank.css'],
        tasks: ['copy:skrollrCSSDev', 'copy:skrollrCSSPublic']
      },
      svgmin: {
        files: ['src/assets/**/*.svg'],
        tasks: ['svgmin']
      },
      haml: {
        files: ['src/*.haml'],
        tasks: ['haml','copy:html','htmlcompressor']
      },
      livereload: {
        options: { livereload: true },
        files: ['dev/**/*']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-haml');
  grunt.loadNpmTasks('grunt-htmlcompressor');
  grunt.loadNpmTasks('grunt-svgmin');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'sass', 'haml', 'htmlcompressor', 'autoprefixer', 'svgmin', 'copy']);
};
