# Stage 0
# Frontend build based on Node.js
FROM node:14.17.6-alpine as build-stage
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
RUN npm config set unsafe-perm true
RUN yarn
RUN npm install react-scripts@3.4.1 -g
COPY . /usr/src/app
RUN npm run build

# Stage 1
# Production build based on Nginx with artefacts from Stage 0
FROM nginx:1.21.4-alpine
COPY ngnix/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]