FROM node:latest

# upgrade system
RUN apt-get -y update

# sqlite3
RUN apt-get -y install sqlite3

## work dir
RUN mkdir /cat-utils
WORKDIR /cat-utils

ENV TEST_ENV="docker"
