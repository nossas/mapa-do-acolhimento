FROM node:18-alpine

RUN yarn global add pnpm

WORKDIR /usr/src/app

COPY ./ .

RUN pnpm i

RUN pnpm m run lint

RUN pnpm m run build