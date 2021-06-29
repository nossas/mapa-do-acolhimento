FROM node:14-alpine

RUN yarn global add pnpm

WORKDIR /usr/src/app

COPY ./ .
