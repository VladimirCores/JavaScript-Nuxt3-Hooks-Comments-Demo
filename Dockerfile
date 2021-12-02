FROM node:14-alpine
WORKDIR /usr/src/app
COPY . .
RUN yarn install
RUN yarn build
ENV PORT=8080
ENV API_URL=https://jsonplaceholder.typicode.com
EXPOSE 8080
CMD ["yarn", "start"]
