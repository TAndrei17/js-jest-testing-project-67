install:
	npm ci

publish:
	npm publish --dry-runl

page-loader:
	babel-node bin/page-loader.js

lint:
	npx eslint .

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage