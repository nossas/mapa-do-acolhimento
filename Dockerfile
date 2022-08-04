FROM node:14-alpine

RUN yarn global add pnpm@6

WORKDIR /usr/src/app

COPY ./ .

RUN pnpm i

RUN pnpm m run lint

RUN pnpm m run build