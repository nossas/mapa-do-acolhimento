FROM node:14-alpine

RUN yarn global add pnpm

WORKDIR /usr/src/app

COPY ./ .

RUN pnpm i

RUN pnpm m run build

#CMD node ./packages/webhooks-mautic-registry/dist