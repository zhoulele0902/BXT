/**
 * Created by zhoulele on 2017/2/28.
 */
var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'run-sequence']
});

gulp.task('build-dev',function (callback) {
  $.runSequence('copy-config',[
    'copy-dev-libs',
    'copy-img',
    'html',
    'copy-configxml',
    'resource'
  ],'inject', callback);
});

// Default Task
gulp.task('default', ['run-dev']);

// Default Task
gulp.task('run-dev', function (callback) {
  $.runSequence('clean', 'build-dev', callback);
});
