var gulp = require('gulp'),
  connect = require('gulp-connect'),
  historyApiFallback = require('connect-history-api-fallback'),
  sass = require('gulp-sass'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish');
/* Para mostrar errores de JS en el navegador, y para
  mejor lectura en la consola */

// Servidor web de desarrollo
gulp.task('server', function(){
  connect.server({
    root: './app/',
    hostname: '0.0.0.0',
    port: 8080,
    livereload: true,
    middleware: function(connect, opt){
      return [ historyApiFallback ];
    }
  });
});

// buscar errores JS y mostrarlos en pantalla
gulp.task('jshint', function(){
  return gulp.src('./app/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// escucha cambios en el html y recarga el navegador
gulp.task('html', function(){
  gulp.src('./app/index.html')
  .pipe(connect.reload());
});

// escucha cambios en sass, compila, y recarga en css
gulp.task('css', function(){
  gulp.src('./app/css/*.scss')
  .pipe(sass({ errLogToConsole: true }))
  .pipe(gulp.dest('./app/css'))
  .pipe(connect.reload());
});

// vigila cambios en el codigo y recarga navegador
gulp.task('watch', function(){
  gulp.watch(['./app/index.html'], ['html']);
  gulp.watch(['./app/css/style.scss'], ['css']);
  gulp.watch(['./app/js/**/*.js'], ['jshint']);
});


gulp.task('default', ['server', 'watch']);