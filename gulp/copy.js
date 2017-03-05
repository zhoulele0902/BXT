/**
 * Created by zhoulele on 2017/2/27.
 */
var path = require('path');

var gulp = require('gulp');

var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'lazypipe']
});

var imagePath = [
  "app/img/*",
  "app/img/**/*"
];

var libDevFilePath = [
  'app/lib/**/*.*',
  'app/lib/**/**/*.*',
  'app/lib/**/**/**/*.*'
];

var libPublishFilePath = [
  'app/lib/**/css/ionic.min.css',
  'app/lib/**/fonts/*.*',
  'app/lib/**/js/ionic.bundle.js',
  'app/lib/**/rollups/md5.js',
  'app/lib/**/dist/jquery.min.js',
  'app/lib/**/dist/ng-cordova.js',
  'app/lib/**/dist/ionic-datepicker.bundle.min.js',
];

//handle img
gulp.task('copy-img',function () {
  return gulp.src(imagePath)
    .pipe(gulp.dest('www/build/img'));
});

//copy all files
gulp.task('copy-dev',function () {
  return gulp.src([
    'src/**/*',
    '!src/index.html',
    '!src/scripts/*'
  ]).pipe(gulp.dest('www'));
});

//copy ionic lib
gulp.task('copy-dev-libs',function () {
  return gulp.src(libDevFilePath)
    .pipe(gulp.dest('www/build/lib'));
});
