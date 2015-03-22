module.exports = function(grunt) {

  grunt.initConfig({
  jade: {
    html: {
      files: {
        'dist/': ['src/index.jade']
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
          files: {"dist/css/main.css": "src/less/main.less"}
      }
  },
copy: {
  main: {
    files: [
      // includes files within path
      { src: ['package.json'], dest: 'dist/package.json'},

      // includes files within path and its sub-directories
      {cwd: '', src: 'node_modules/**/*', dest: 'dist', expand: true},
      {cwd: 'src', src: 'js/**/*', dest: 'dist', expand: true},

    ],
  },
},

  nodewebkit: {
    options: {
      platforms: ['win64'],
      buildDir: './builds',
      },
  src: ['./dist/**/*']}

  });

  grunt.loadNpmTasks('grunt-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['jade', 'less', 'copy', 'nodewebkit']);

};
