import gulp from 'gulp';
import clean from 'gulp-clean';
import sass from 'gulp-sass';
import * as sassCompiler from 'sass';
import concat from 'gulp-concat';
import terser from 'gulp-terser'; // Используем gulp-terser для минификации
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';

const scss = sass(sassCompiler);

// Функция для очистки каталога dist
function cleanDist() {
	return gulp.src('dist/*', { read: false, allowEmpty: true }) // Очищаем содержимое dist
		.pipe(clean());
}

// Функция для обработки скриптов
function scripts() {
	return gulp.src(['app/js/main.js'])
		.pipe(concat('main.min.js'))
		.pipe(terser()) // Используем terser для минификации
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.stream());
}

// Функция для обработки стилей
function styles() {
	return gulp.src(['app/scss/reset.scss', 'app/scss/style.scss']) // Здесь добавляем reset.scss
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'] }))
		.pipe(concat('style.min.css'))
		.pipe(scss({ outputStyle: 'compressed' }))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
}

// Функция для сборки проекта
function building() {
	return gulp.src([
		'app/css/style.min.css',
		'app/js/main.min.js',
		'app/**/*.html',
	], { base: 'app' })
		.pipe(gulp.dest('dist'));
}

// Функция для слежения за изменениями
function watcher() {
	gulp.watch(['app/scss/style.scss'], styles);
	gulp.watch(['app/js/main.js'], scripts);
	gulp.watch(['app/*.html']).on('change', browserSync.reload);
}

// Функция для инициализации BrowserSync
function browsersync() {
	browserSync.init({
		server: {
			baseDir: "app/"
		}
	});
}

// Экспортируем функции
export { cleanDist as clean }; // Переименовываем для избежания конфликта
export const build = gulp.series(cleanDist, building); // Сборка с очисткой
export { styles, scripts, watcher, browsersync, building }; // Экспорт остальных задач

// Задача по умолчанию
export default gulp.parallel(styles, scripts, browsersync, watcher);
