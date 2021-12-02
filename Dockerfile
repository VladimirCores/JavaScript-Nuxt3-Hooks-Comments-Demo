FROM node:14-alpine
WORKDIR /usr/src/app
COPY . .
RUN yarn install
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
