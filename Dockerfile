FROM node:14-alpine
WORKDIR /usr/src/app
COPY . .
# RUN rm -rf ./node_modules
RUN yarn -version
RUN yarn install
EXPOSE 3000
EXPOSE 24678
CMD ["yarn", "dev"]
