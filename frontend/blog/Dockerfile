FROM node:18-alpine

RUN mkdir /home/app

COPY public/ /home/app/public
COPY src/ /home/app/src
COPY package.json /home/app/

WORKDIR /home/app

RUN npm install
