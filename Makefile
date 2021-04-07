.PHONY: all tests coverage

install:
	npm install

coverage:
	npm run test

build:
	npm run build

dev:
	npm run dev

push:
	git push && git push --tags

reset:
	git reset --hard
	git clean -xdf

purge:
	rm -rf ./node_modules
	npm cache clean --force

http:
	http-server -p 8084 -c-1 dist

gitmessage:
	touch .gitmessage
	echo "\n# commit message\n.gitmessage" >> .gitignore
	git config commit.template .gitmessage
