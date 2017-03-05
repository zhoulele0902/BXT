/**
 * Created by zhoulele on 2017/3/1.
 */
var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var gutil = require('gulp-util');
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'lazypipe']
});
var _ = require('lodash');

//minify css
gulp.task('css',function () {
  return gulp.src('www/build/css/*.css')
    .pipe($.sourcemaps.init())
    .pipe($.cssnano({reduceIndents:false}))
    .pipe($.sourcemaps.write('.',{includeContent: false, sourceRoot: '.'}))
    .pipe(gulp.dest('www/build/css'))
});

//inject and wiredep
gulp.task('inject',['sass','scripts'],function () {
  var injectFiles = gulp.src(['www/build/css/*.css'],{read:false});
  var injectScripts = gulp.src(['www/build/*.js','!www/build/app.bundle.min.js']);
  var injectOptions = {
    ignorePath:['www'],
    addRootSlash:false,
  };
  var wiredepOptions = {
    directory:'www/build/lib',
    ignorePath:'../www/',
  };
  return gulp.src('app/*.html')
    .pipe($.inject(injectFiles,injectOptions))
    .pipe($.inject(injectScripts,injectOptions))
    .pipe(wiredep(wiredepOptions))
    .pipe(gulp.dest('www'));
});
