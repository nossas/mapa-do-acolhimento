FROM node:14-alpine

RUN yarn global add pnpm

WORKDIR /usr/src/app

COPY ./ .

# RUN pnpm m i --filter bonde-microservices --filter cli-mautic

# RUN pnpm m run build --filter cli-mautic

CMD node ./packages/cli-mautic/dist
