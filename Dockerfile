FROM node:8.1.0-alpine

# ADD NODEJS
RUN apk update && \
	apk upgrade && \
	apk add git make

RUN mkdir -p /var/static-CI/
WORKDIR /var/static-CI/

COPY *.json /var/static-CI/

RUN npm install

# copy source files
COPY *.js /var/static-CI/

EXPOSE 3000
CMD ["npm", "start"]

