bin: bin/code.js bin/style.css
	touch $@

bin/code.js: src/*.js .babelrc node_modules
	mkdir -p bin
	browserify src/index.js -t babelify --outfile $@

bin/style.css: style/*.less
	lessc style/main.less > $@

node_modules: package.json
	npm install
	touch $@

.PHONY: server
server:
	python3 -m http.server

## This seems to be really slow with React. Urgh. Maybe use webpack instead then?
.PHONY: watch
watch: src/*.js node_modules
	mkdir -p bin
	watchify src/index.js -t babelify --outfile $@
