/**
 * Created by zhoulele on 2017/2/27.
 */
var path = require('path');

var gulp = require('gulp');

var conf = require('./conf');

var browerSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('sass',function () {
  return buildStyles().pipe(browerSync.reload({stream: true}));
});

var buildStyles = function () {
  var sassOptions = {
    outputStyle:'expanded', //输出格式
    precision:10
  };
  return gulp.src('app/theme/*.scss')
    .pipe($.sass(sassOptions))
    .pipe($.autoprefixer())
    .pipe(gulp.dest('www/build/css'))
}

gulp.task('reload-img',['copy-img'],function () {
  return browerSync.reload({stream: true});
})


