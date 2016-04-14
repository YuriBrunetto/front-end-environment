"use strict";

var gulp = require("gulp");
var uglify = require("gulp-uglify");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");
var concat = require("gulp-concat");

gulp.task("serve", ["sass"], function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("./scss/*.scss", ["sass"]);
    gulp.watch("./*.html").on("change", browserSync.reload);
    gulp.watch("./js/**/*.js", ["js-watch"]);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", function() {
    return gulp.src("./scss/*.scss")
        .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

// Reload when saving js
gulp.task("js-watch", ["js"], browserSync.reload);

// Uglify .js files
gulp.task("js", function(){
    return gulp.src("./js/**/*.js")
        .pipe(concat("core.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist"))
        .pipe(browserSync.stream());
});

gulp.task("default", ["serve"]);
