
# Build: Stage 1
FROM node:18.17-alpine as build

LABEL author="cleyxds"

WORKDIR /usr/share/app

COPY package.json .

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

# Runner: Stage 2
FROM node:18.17-alpine

WORKDIR /usr/share/app

COPY --from=build /usr/share/app/build .
COPY --from=build /usr/share/app/package.json .

RUN yarn --frozen-lockfile --prod

EXPOSE 3434

CMD yarn start
