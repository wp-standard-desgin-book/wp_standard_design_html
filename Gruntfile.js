'use strict';

// Directory reference:
//   css: css
//   compass: _scss
//   javascript: js
//   images: images
//   fonts: fonts

module.exports = function (grunt) {

	require('time-grunt')(grunt);
	// Load all Grunt tasks
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		// Configurable paths
		yeoman: {
			app: 'app',
			dist: 'dist'
		},
		watch: {
			compass: {
				files: ['<%= yeoman.app %>/_scss/**/*.{scss,sass}'],
				tasks: ['compass:server', 'autoprefixer:server']
			},
			autoprefixer: {
				files: ['<%= yeoman.app %>/css/**/*.css'],
				tasks: ['copy:stageCss','autoprefixer:server']
			},
			jekyll: {
				files: [
					'<%= yeoman.app %>/**/*.{html,yml,md,mkd,markdown}',
					'!<%= yeoman.app %>/_bower_components/**/*'
				],
				tasks: ['jekyll:server']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'.jekyll/**/*.html',
					'.tmp/css/**/*.css',
					'{.tmp,<%= yeoman.app %>}/<%= js %>/**/*.js',
					'<%= yeoman.app %>/images/**/*.{gif,jpg,jpeg,png,svg,webp}'
				]
			}
		},
		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					open: true,
					base: [
						'.tmp',
						'.jekyll',
						'<%= yeoman.app %>'
					]
				}
			},
			dist: {
				options: {
					open: true,
					base: [
						'<%= yeoman.dist %>'
					]
				}
			},
			test: {
				options: {
					base: [
						'.tmp',
						'.jekyll',
						'test',
						'<%= yeoman.app %>'
					]
				}
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'<%= yeoman.dist %>/*',
						// Running Jekyll also cleans the target directory.  Exclude any
						// non-standard `keep_files` here (e.g., the generated files
						// directory from Jekyll Picture Tag).
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			server: [
				'.tmp',
				'.jekyll'
			],
			styleguide: [
				'styleguide/*',
			]
		},
		compass: {
			options: {
				// If you're using global Sass gems, require them here.
				// require: ['singularity', 'jacket'],
				bundleExec: true,
				sassDir: '<%= yeoman.app %>/_scss',
				cssDir: '.tmp/css',
				imagesDir: '<%= yeoman.app %>/images',
				javascriptsDir: '<%= yeoman.app %>/js',
				relativeAssets: false,
				httpImagesPath: '/images',
				httpGeneratedImagesPath: '/images/generated',
				outputStyle: 'expanded',
				raw: 'extensions_dir = "<%= yeoman.app %>/_bower_components"\n',
				noLineComments: true
			},
			dist: {
				options: {
					generatedImagesDir: '<%= yeoman.dist %>/images/generated'
				}
			},
			server: {
				options: {
					debugInfo: false,
					generatedImagesDir: '.tmp/images/generated'
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 2 versions']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/css',
					src: '**/*.css',
					dest: '<%= yeoman.dist %>/css'
				}]
			},
			server: {
				files: [{
					expand: true,
					cwd: '.tmp/css',
					src: '**/*.css',
					dest: '.tmp/css'
				}]
			}
		},
		jekyll: {
			options: {
				bundleExec: true,
				config: '_config.yml,_config.build.yml',
				src: '<%= yeoman.app %>'
			},
			dist: {
				options: {
					dest: '<%= yeoman.dist %>',
				}
			},
			server: {
				options: {
					config: '_config.yml',
					dest: '.jekyll'
				}
			},
			check: {
				options: {
					doctor: true
				}
			}
		},
		useminPrepare: {
			options: {
				dest: '<%= yeoman.dist %>'
			},
			html: '<%= yeoman.dist %>/index.html'
		},
		usemin: {
			options: {
				assetsDirs: '<%= yeoman.dist %>',
			},
			html: ['<%= yeoman.dist %>/**/*.html'],
			css: ['<%= yeoman.dist %>/css/**/*.css']
		},
		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>',
					src: '**/*.html',
					dest: '<%= yeoman.dist %>'
				}]
			}
		},
		// Usemin adds files to concat
		concat: {},
		// Usemin adds files to uglify
		uglify: {},
		// Usemin adds files to cssmin
		cssmin: {
			dist: {
				options: {
					check: 'gzip'
				}
			}
		},
		imagemin: {
			dist: {
				options: {
					progressive: true
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>',
					src: '**/*.{jpg,jpeg,png}',
					dest: '<%= yeoman.dist %>'
				}]
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>',
					src: '**/*.svg',
					dest: '<%= yeoman.dist %>'
				}]
			}
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					src: [
						// Jekyll processes and moves HTML and text files.
						// Usemin moves CSS and javascript inside of Usemin blocks.
						// Copy moves asset files and directories.
						'images/**/*',
						'fonts/**/*',
						// Like Jekyll, exclude files & folders prefixed with an underscore.
						'!**/_*{,/**}',
						// Explicitly add any files your site needs for distribution here.
						'_bower_components/jquery/jquery.js',
						'favicon.ico',
						'apple-touch*.png'
					],
					dest: '<%= yeoman.dist %>'
				}]
			},
			distCss: {
				files: [{
					expand: true,
					dot: true,
					cwd: '.tmp/css',
					src: [
						'**/*.css'
					],
					dest: '<%= yeoman.dist %>'
				}]
			},
			// Copy CSS into .tmp directory for Autoprefixer processing
			stageCss: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>/css',
					src: '**/*.css',
					dest: '.tmp/css'
				}]
			},
			styleGuideImage: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					src: ['images/**/*'],
					dest: 'styleguide'
				}]
			}
		},
		filerev: {
			options: {
				length: 4
			},
			dist: {
				files: [{
					src: [
						'<%= yeoman.dist %>/js/**/*.js',
						'<%= yeoman.dist %>/css/**/*.css',
						'<%= yeoman.dist %>/images/**/*.{gif,jpg,jpeg,png,svg,webp}',
						'<%= yeoman.dist %>/fonts/**/*.{eot*,otf,svg,ttf,woff}'
					]
				}]
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'<%= yeoman.app %>/js/**/*.js',
				'test/spec/**/*.js'
			]
		},
		kss: {
			options: {
				template: 'template',
				includeType: 'css',
				includePath: 'dist/css/style.css'
			},
			dist:{
				files:{
					'styleguide': ['app/_scss']
				}
			}
		},
		csslint: {
			options: {
				csslintrc: '.csslintrc'
			},
			check: {
				src: [
					'<%= yeoman.app %>/css/**/*.css',
					'<%= yeoman.app %>/_scss/**/*.scss'
				]
			}
		},
		concurrent: {
			server: [
				'compass:server',
				'copy:stageCss',
				'jekyll:server'
			],
			dist: [
				'compass:dist',
				'copy:dist',
				'copy:distCss'
			]
		},
		browserSync: {
				dev: {
						bsFiles: {
								src : [
									'.jekyll/**/*.html',
									'.tmp/css/**/*.css'
								]
						},
						options: {
								proxy : 'localhost:9000',
								watchTask: true
						}
				}
		},
		prettify: {
			options: {
				config: '.prettifyrc'
			},
			all: {
				expand: true,
				cwd: 'dist/',
				ext: '.html',
				src: ['*.html'],
				dest: 'dist/'
			},
			shop: {
				expand: true,
				cwd: 'dist/shop/',
				ext: '.html',
				src: ['*.html'],
				dest: 'dist/shop/'
			},
			menus: {
				expand: true,
				cwd: 'dist/menus/',
				ext: '.html',
				src: ['*.html'],
				dest: 'dist/menus/'
			},
			blog: {
				expand: true,
				cwd: 'dist/blog/',
				ext: '.html',
				src: ['*.html'],
				dest: 'dist/blog/'
			},
		},
		replace: {
		  dist: {
		    src: ['dist/menus/*.html'],
	      dest: 'dist/menus',
	      replacements: [{
	        from: '<img src="/images',
	        to: '<img src="images'
	      }, {
	        from: 'href="/',
	        to: 'href="'
	      }, {
	        from: 'src="/js',
	        to: 'src="js'
	      }, {
	        from: 'url(/',
	        to: 'url('
	      }]
	    }
		}
	});


	// Define Tasks
	grunt.registerTask('serve',['browserSync'], function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'concurrent:server',
			'autoprefixer:server',
			'connect:livereload',
			'watch',
			'kss'
		]);
	});

	grunt.registerTask('server', function () {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve']);
	});

	grunt.registerTask('check', [
		'clean:server',
		'jekyll:check',
		'compass:server',
		'jshint:all',
		'csslint:check'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'jekyll:dist',
		'concurrent:dist',
		'useminPrepare',
		'concat',
		'autoprefixer:dist',
		'uglify',
		// 'imagemin',
		'usemin',
		'styleguide',
		'htmlautofixer',
		// 'stringreplace'
		]);

	grunt.registerTask('htmlautofixer',[
		'prettify'
	]);

	grunt.registerTask('stringreplace',[
		'replace'
	]);

	grunt.registerTask('styleguide', [
		'clean:styleguide',
		'kss',
		'copy:styleGuideImage'
	]);

	grunt.registerTask('default', [
		'check',
		'test',
		'build'
	]);
};
