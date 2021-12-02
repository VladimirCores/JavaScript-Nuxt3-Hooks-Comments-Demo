FROM node:14-alpine
WORKDIR /usr/src/app
COPY . .
#RUN rm -rf ./node_modules
RUN rm -rf ./.nuxt
RUN rm -rf ./.output
RUN yarn -version
RUN yarn install
RUN yarn build
EXPOSE 3000
EXPOSE 24678
CMD ["yarn", "start"]
