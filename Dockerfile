FROM node:16-alpine

RUN yarn global add pnpm

WORKDIR /usr/src/app

COPY ./ .

RUN pnpm i

RUN pnpm m run build-all