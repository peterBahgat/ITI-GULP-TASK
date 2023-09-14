const { dest, src, series } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const terser = require('gulp-terser');
const imageop = require('gulp-image-optimization');
const replace = require('gulp-replace');

const globs = {
  html: ['./*.html', './src/**/*.html'], // Include HTML files in src folder
  css: ['./*.css', './src/**/*.css'], // Include CSS files in src folder
  js: ['./src/**/*.js', './*.js'],
  img: './images/*.{png,jpg,gif,svg}',
};

exports.html = () => {
  return src(globs.html)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(replace('src="images/', 'src="../images/')) // Replace image paths in HTML
    .pipe(replace('href="styles.css', 'href="../styles.min.css')) // Replace CSS path in HTML
    .pipe(replace('src="script.min.js', 'src="../script.min.js')) // Replace JavaScript path in HTML
    .pipe(dest('dist'));
};

exports.css = () => {
  return src(globs.css)
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(replace('url("images/', 'url("../images/')) // Replace image paths in CSS
    .pipe(dest('dist'));
};

exports.js = () => {
  return src(globs.js)
    .pipe(concat('script.min.js'))
    .pipe(rename('bundle.min.js'))
    .pipe(terser())
    .pipe(dest('dist'));
};

exports.img = () => {
  return src(globs.img).pipe(imageop()).pipe(dest('dist/images')); // Ensure images go to the 'dist/images' directory
};

exports.build = series(exports.html, exports.css, exports.js, exports.img);

exports.default = exports.build;
