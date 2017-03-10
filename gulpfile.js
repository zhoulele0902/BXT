/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp');
var fs = require('fs');
//wiredep解决bower前端库引入进html的问题
var wiredep = require('wiredep').stream;

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'lazypipe', 'del', 'run-sequence']
});
var _ = require('lodash');

var browserSync = require('browser-sync');

var imagePath = [
  "app/img/*",
  "app/img/*/*"];
var jsFilePath = [
  'app/*.js',
  'app/scripts/*.js',
  'app/scripts/*/*.js',
  'app/pages/**/*.js',
  'app/pages/**/**/*.js'];

var htmlFilePath = [
  'app/pages/**/*.html',
  'app/pages/**/**/*.html'];

//异步读取目录
fs.readdirSync('./gulp').filter(function (file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function (file) {
  require('./gulp/' + file);
});

function isOnlyChange(event) {
  return event.type === 'changed';
}

// start browserSync
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'www'
    },
  })
})

// Clean Task
gulp.task('clean', function () {
  $.del(['www/build/*', 'app/scripts/baseConfig.js', 'www/index.html']);
});

// Watch Files For Changes
gulp.task('watch',['browserSync'],function () {
  gulp.watch(['app/pages/**/*.scss','app/pages/**/**/*.scss','app/theme/*.scss'], ['reload-sass']);
  gulp.watch(jsFilePath, ['reload-scripts']);
  gulp.watch(htmlFilePath, ['reload-pagesHtml']);
  gulp.watch(imagePath,['reload-img']);
});

gulp.task('serve',['watch'], function (callback) {
  $.runSequence('build-dev', callback);
});
