FROM node:12-alpine

RUN yarn global add pnpm@5.2.1

WORKDIR /usr/src/app

COPY ./ .