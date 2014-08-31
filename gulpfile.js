var gulp = require('gulp'),
    pkg = require('./package.json'),
    plugins = require('gulp-load-plugins')(),
    banner = [
        '/*!',
        ' * <%= config.name %> - <%= config.description %>',
        ' * @version v<%= config.version %> - <%= config.today %>',
        ' * @link <%= config.homepage %>',
        ' * @author <%= config.author %>',
        ' * @license <%= config.license %>',
        ' */',
        ''
    ].join('\n'),
    config = pkg;

config.src = "src/";
config.dist = "./";
config.today = (new Date()).toDateString();

// CSS
gulp.task('css', function() {
    gulp.src([config.src + 'less/main.less'])
        .pipe(plugins.less())
        .pipe(plugins.header(banner, {
            config: config
        }))
        .pipe(gulp.dest(config.dist + 'css'))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.dist + 'css'))
        .pipe(plugins.notify({
            message: 'CSS task complete'
        }));
});

// JavaScripts
gulp.task('js', function() {
    return gulp.src(config.src + 'js/**/*.js')
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.header(banner, {
            config: config
        }))
        .pipe(gulp.dest(config.dist + 'js'))
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(plugins.uglify())
        .pipe(plugins.header(banner, {
            config: config
        }))
        .pipe(gulp.dest(config.dist + 'js'))
        .pipe(plugins.notify({
            message: 'JavaScripts task complete'
        }));
});

// Images
gulp.task('img', function() {
    return gulp.src(config.src + 'img/*')
        .pipe(plugins.cache(plugins.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(config.dist + 'img'))
        .pipe(plugins.notify({
            message: 'Images task complete'
        }));
});

// Default task
gulp.task('default', function() {
    gulp.start('css', 'js', 'img');
});
