run:
	/Applications/nwjs.app/Contents/MacOS/nwjs .

npm-install:
	npm install

nw:
	mkdir -p dist
	zip -qr dist/app.nw *

build: npm-install nw
	
