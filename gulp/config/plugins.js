import replace from "gulp-replace"; //Search and replace
import plumber from "gulp-plumber"; //Error handling
import notify from "gulp-notify"; // Message (tip)
import browsersync from "browser-sync"; // local server
import newer from "gulp-newer";
import ifPlugin from "gulp-if";

export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
	newer: newer,
	if: ifPlugin
}
