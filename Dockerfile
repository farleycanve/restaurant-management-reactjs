FROM node:alpine as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --force
RUN npm install -g react-scripts@4.0.3
RUN npm install -g env-cmd
COPY . ./
ENV NODE_OPTIONS=--openssl-legacy-provider
ARG stage
RUN npm run build:$stage

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]