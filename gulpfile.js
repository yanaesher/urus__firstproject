// Main module
import gulp from "gulp";
// Import paths
import { path } from "./gulp/config/path.js";
//Import common plugins
import { plugins } from "./gulp/config/plugins.js";


// Transfer data to a global variable

global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins
}

// Import Tasks
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";



// File change observer
function watcher() {
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);
}

export { svgSprive }

// sequential font processing
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
//Main tasks
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

// Building a task execution scenario
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);


//Executing the default script

export { dev }
export { build }


gulp.task('default', dev);


