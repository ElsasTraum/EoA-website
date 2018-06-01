'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};
var slim = require('gulp-slim');
var browserSync = require('browser-sync');
//var reload = browserSync.reload;


var paths = {
  html: {
    input: "src/slim/*.slim",
    output: "dist/"
  },
  sass: {
    input: "src/sass/**/*.scss",
    output: "dist/css/"
  }
};


gulp.task('slim', function () {
  return gulp.src(paths.html.input)
    .pipe(slim({
      pretty: true,
      options: "encoding='utf-8'",
      require: 'slim/include',
      format: 'xhtml',
      options: 'include_dirs=["src/slim/include/"]'
    }))
    .pipe(gulp.dest(paths.html.output));
});


/*gulp.task('sass', () =>
  sass(paths.sass.input, {
    style: 'compressed',
    sourcemap: true
  })
  .on('error', sass.logError)
  .pipe(autoprefixer(autoprefixerOptions))
  .pipe(sourcemaps.init())
  .pipe(sourcemaps.write(""))
  .pipe(gulp.dest(paths.sass.output))
);*/

gulp.task('sass', function () {
 return gulp.src(paths.sass.input)
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer(autoprefixerOptions))
  .pipe(sourcemaps.write(''))
  .pipe(gulp.dest(paths.sass.output));
});

/* Reload task */
/*gulp.task('bs-reload', function () {
  browserSync.reload();
});*/

/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function () {
  browserSync.init(['dist/js/*.js', 'dist/css/*.css', 'dist/*.html'], {
    /*
    I like to use a vhost, WAMP guide: https://www.kristengrote.com/blog/articles/how-to-set-up-virtual-hosts-using-wamp, XAMP guide: http://sawmac.com/xampp/virtualhosts/
    */
    /*proxy: 'your_dev_site.url'*/
    /* For a static server you would use this: */

    server: {
      baseDir: './dist'
    }

  });
});

// Watch Files For Changes
/*gulp.task('watch', function () {
  // Watch the input folder for change,
  // and run `sass` task when something happens
  gulp.watch(paths.sass.input, ['sass']);
  gulp.watch(paths.html.input, ['slim']);
  // When there is a change,
  // log a message in the console
  gulp.on('change', function (event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('default', ['sass', 'slim', 'watch' //, possible other tasks...  ]);*/


gulp.task('default', ['sass', 'slim', 'browser-sync'], function () {
  /* Watch scss, run the sass task on change. */
  gulp.watch(paths.sass.input, ['sass'])
  /* Watch .html files, run the bs-reload task on change. */
  gulp.watch(paths.html.input, ['slim'])
});
