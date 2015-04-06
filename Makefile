run:
	/Applications/nwjs.app/Contents/MacOS/nwjs .

npm-install:
	npm install

nw:
	mkdir -p dist
	zip -qr ../app.nw *

build: npm-install nw
	
