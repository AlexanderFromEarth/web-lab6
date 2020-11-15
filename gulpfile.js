const gulp = require("gulp");
const browserify = require("browserify");
const babelify = require("babelify");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const srcmaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const terser = require("gulp-terser");
const cssmin = require("gulp-cssmin");
const imagemin = require("gulp-imagemin");
const spritesmith = require("gulp.spritesmith");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const del = require("del");

const stylesPath = "./src/scss/";
const assetsPath = "./src/assets/";
const scriptsPath = "./src/js/**/*.js";
const mainPath = "./src/js/main.js";
const imagesPath = "./src/assets/img/*.{img,png}";
const distPath = "./dist/";
const babelPresets = ["@babel/env", "@babel/react"];
const babelPlugins = ["@babel/transform-runtime"];

gulp.task("default", () => {
  return new Promise((resolve, reject) => {
    console.log("Gulp is ready to work");
    resolve();
  });
});

gulp.task("clean", () => {
  return del(distPath);
});

gulp.task("styles", () => {
  return gulp
    .src(stylesPath + "*.*")
    .pipe(srcmaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(concat("index.css"))
    .pipe(srcmaps.write())
    .pipe(gulp.dest(distPath));
});

gulp.task("scripts", () => {
  return browserify(mainPath)
    .transform(babelify, { presets: babelPresets, plugins: babelPlugins })
    .bundle()
    .pipe(source("index.js"))
    .pipe(buffer())
    .pipe(terser())
    .pipe(gulp.dest(distPath));
});

gulp.task("sprites", () => {
  const sprite = gulp.src(imagesPath).pipe(
    spritesmith({
      imgName: "sprite.png",
      cssName: "_sprite.scss",
      cssFormat: "scss",
    })
  );
  sprite.img.pipe(gulp.dest(assetsPath));
  return sprite.css.pipe(gulp.dest(stylesPath));
});

gulp.task("assets", () => {
  return gulp
    .src(assetsPath + "*.*")
    .pipe(imagemin({ silent: true }))
    .pipe(gulp.dest(distPath));
});

gulp.task(
  "build",
  gulp.series("clean", "sprites", gulp.parallel("styles", "scripts", "assets"))
);

gulp.task("watch", () => {
  gulp.watch(imagesPath, gulp.series("sprites"));
  gulp.watch(stylesPath + "*.*", gulp.series("styles"));
  gulp.watch(scriptsPath, gulp.series("scripts"));
  gulp.watch(assetsPath, gulp.series("assets"));
});

gulp.task("dev", gulp.series("build", "watch"));
