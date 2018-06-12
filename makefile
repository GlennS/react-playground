bin/code.js: src/*.js .babelrc node_modules/installed
	mkdir -p bin
	browserify src/index.js -t babelify --outfile $@

node_modules/installed: package.json
	npm install
	touch $@

.PHONY: watch
watch: src/*.js node_modules/installed
	mkdir -p bin
	watchify src/index.js -t babelify --outfile $@
