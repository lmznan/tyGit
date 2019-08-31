//1.导入所需模块
let gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass');
    babel = require('gulp-babel');

//2.发布任务 task('任务名'，回调函数)
//发布测试任务
gulp.task('test',()=>{
    console.log('gulp测试成功！');
})

gulp.task('sass',()=>{
    gulp.src('./src/sass/*.scss').pipe(sass())
    //.pipe(cssnano())
    .pipe(rename({suffix : '.min'})).pipe(gulp.dest('./dist/css'));
})
gulp.task('img', () => {
    gulp.src('./src/img/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
})
gulp.task('es6',()=>{
    gulp.src('./src/js/ES6/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./src/js/ES5'));
})
gulp.task('js',()=>{
    gulp.src('./src/js/ES5/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js'));
})
gulp.task('default',()=>{
    gulp.watch('./src/sass/*.scss',['sass']);
    gulp.watch('./src/img/*.*',['img']);
    gulp.watch('./src/js/ES6/*.js',['es6']);
    gulp.watch('./src/js/ES5/*.js',['js']);
})