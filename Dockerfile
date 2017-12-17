FROM alpine:3.5

# ADD NODEJS
RUN apk update && apk add nodejs

RUN mkdir -p /var/static-CI/
WORKDIR /var/static-CI/

COPY *.json /var/static-CI/
RUN npm install

# copy source files
COPY *.js /var/static-CI/

CMD ["npm", "start"]

