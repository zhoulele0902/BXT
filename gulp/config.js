/**
 * Created by zhoulele on 2017/3/1.
 */
var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')({
  pattern:['gulp-*', 'lazypipe']
})

var gulpNgConfig = require('gulp-ng-config');

//配置开发环境的  正式环境的 config.xml文件和app图标 启动页
var configXMLPath = ['publish/dev/configxmlDev/*'];
var configXMLPathProd = ['publish/prod/configxmlprod/*'];
var resourcePath = ['publish/dev/resourcesDev/*/*/*', 'publish/dev/resourcesDev/*.png'];
var resourcePathProd = ['publish/prod/resourcesProd/*/*/*', 'publish/prod/resourcesProd/*.png'];

//config 开发环境
gulp.task('copy-config',function () {
  return gulp.src('app/config/devConfig.json')
    .pipe(gulpNgConfig('baseConfig'))
    .pipe($.rename('baseConfig.js'))
    .pipe(gulp.dest('app/scripts'))
});

gulp.task('copy-configxml',function () {
  return gulp.src(configXMLPath)
    .pipe($.useref({noAssets:true},$.lazypipe().pipe($.sourcemaps.init,{loadMaps:true})))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(''));
});

gulp.task('resource',function () {
return gulp.src(resourcePath)
  .pipe(gulp.dest('resources'))
});
