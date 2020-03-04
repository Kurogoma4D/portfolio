FROM node:10.16.2-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY /src/app ./
COPY package.json yarn.lock ./
RUN yarn install && yarn build

ENV PORT 8080

CMD ["yarn", "start"]