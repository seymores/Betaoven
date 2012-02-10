
test:
	@clear && NODE_ENV=test ./node_modules/.bin/mocha

test-w:
	@clear && NODE_ENV=test ./node_modules/.bin/mocha -w

.PHONY: test