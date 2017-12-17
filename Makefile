secret:
	echo TOKEN=$$(openssl rand -base64 32) > .env

build:
	docker build -t ramsgoli.com/static-ci .

run:
	docker run -it --rm -p 3000:3000 ramsgoli.com/static-ci
