/**
 * Created by zhoulele on 2017/2/27.
 */
var path = require('path');

var gulp = require('gulp');

var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var jsFilePath = [
  'app/*.js',
  'app/scripts/*.js',
  'app/scripts/**/*.js',
  'app/scripts/**/**/*.js',
];

//concat and Uglify js
gulp.task('scripts',function () {
  return gulp.src(jsFilePath)
    .pipe($.concat('app.bundle.js'))
    .pipe(gulp.dest('www/build')) //write source file for debug
    .pipe($.uglify({mangle:true}))  //for debug, do not mangle variable name
    .pipe($.rename({
      suffix:'.min'
    }))
    .pipe($.sourcemaps.write('.',{includeContent: false,sourceRoot:'.'}))
    .pipe(gulp.dest('www/build'))
});

gulp.task('reload-scripts',['scripts'],browserSync.reload);
