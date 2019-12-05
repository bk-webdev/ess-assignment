//=========================
//===    NPM Plugins    ===
//=========================

const gulp = require('gulp');
const liveServer = require('live-server');
const postcss = require('gulp-postcss');
const minifyCss = require('cssnano');
const autoprefix = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');

//==============================
//=== Live-Server Parameters ===
//==============================

const params = {
	port: 3000,
	host: '0.0.0.0',
	root: 'public',
	open: true,
	ignore: 'scss,my/templates',
	file: 'index.html',
	logLevel: 2,
	middleware: [
		function(req, res, next) {
			next();
		}
	]
};

//=========================
//===    File Paths     ===
//=========================
const PUBLIC_PATH = 'public';
const CSS_PATH = 'public/css/*.css';
const SASS_PATH = 'src/sass/**/*.scss';

//=========================
//===      CSS Task     ===
//=========================
function css() {
	console.log('starting styles task');

	return gulp
		.src(CSS_PATH)

		.pipe(postcss([autoprefix(), minifyCss()]))

		.pipe(gulp.dest(PUBLIC_PATH + '/css'));
}

exports.css = css;

//=========================
//===     SASS Task     ===
//=========================
function sassTask() {
	console.log('starting sass task');

	return gulp
		.src(SASS_PATH)
		.pipe(
			plumber(function(err) {
				console.log('Sass Task Error!');
				console.log(err);
				this.emit('end');
			})
		)

		.pipe(sourcemaps.init())

		.pipe(sass())

		.pipe(postcss([autoprefix(), minifyCss()]))

		.pipe(sourcemaps.write('.'))

		.pipe(gulp.dest(PUBLIC_PATH + '/css'));
}

exports.sass = sassTask;

//==========================
//===   Gulp Watch Task  ===
//==========================
function watch() {
	console.log('started gulp watch task');
	liveServer.start(params);
	gulp.watch(SASS_PATH, gulp.series('sass'));
}

exports.watch = watch;
