# Glance with Angular JS
Glance with Angular JS

# Text Editor
* Sublime
* Atom

# Development Setup
* Download node js https://nodejs.org/en/download/
* Install browser sync
    - npm install -g browser-sync (you might need sudo)
* Now inside the directory
    - browser-sync start --server --directory --files "**/*"
* Install Gulp
    - npm install gulp -g
* cd into directory where package.json and gulpfile.js are located
    - npm install gulp --save-dev
    - npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
* Now run
    - gulp watch
