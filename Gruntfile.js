module.exports = function(grunt) {

  grunt.initConfig({
  jade: {
    html: {
      files: {
        'build/': ['src/index.jade']
      },
      options: {
        client: false,
        pretty: false
      }
    }
  },

  less: {
      production: {
          options: {
              cleancss: true,
              compress: true,
              plugins : [
                new (require('less-plugin-autoprefix'))({browsers : [ "last 2 versions" ]})
                ]
          },
          files: {"build/css/main.css": "src/less/main.less"}
      }
  },
copy: {
  main: {
    files: [
      // includes files within path
      { src: ['src/package.json'], dest: 'build/package.json'},

      // includes files within path and its sub-directories
      {cwd: 'src', src: 'node_modules/**/*', dest: 'build', expand: true},
      {cwd: 'src', src: 'js/**/*', dest: 'build', expand: true},

    ],
  },
},

  nodewebkit: {
    options: {
      platforms: ['win64'],
      buildDir: './builds',
      },
  src: ['./build/**/*']}

  });

  grunt.loadNpmTasks('grunt-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['jade', 'less', 'copy', 'nodewebkit']);

};
