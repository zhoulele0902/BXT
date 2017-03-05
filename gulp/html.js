/**
 * Created by zhoulele on 2017/2/28.
 */
'use strict'

var path = require('path');

var gulp = require('gulp');

var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')({
 pattern:['gulp-*', 'lazypipe'],
});

var htmlFilePath =[
  'app/pages/**/*.html',
  'app/pages/**/**/*.html'
];

//compile html
gulp.task('pagesHtml',function () {
  return buildHtml()
})

var buildHtml = function () {
  return gulp.src(htmlFilePath)
    .pipe($.useref({noAssets: true}, $.lazypipe().pipe($.sourcemaps.init,{loadMaps:true})))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('www/build/pages'))
}

gulp.task('rootHtml',function (){
  return gulp.src('src/*.html')
    .pipe($.useref({noAssets: true}), $.lazypipe().pipe($.sourcemaps.init,{loadMaps:true}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('www'))
})

gulp.task('html', ['pagesHtml']);

gulp.task('reload-pagesHtml', function () {
    return buildHtml().pipe(browserSync.reload({stream:true}))
})
