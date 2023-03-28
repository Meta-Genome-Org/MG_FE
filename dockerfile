FROM node:18 as build

ENV NODE_ENV=production

WORKDIR ./

COPY package.json .
COPY package-lock.json . 

RUN npm install 

COPY . .

EXPOSE 3000

RUN npm run build

#deploy 
FROM nginx:alpine as production

COPY --from=build /build /var/www/html/
COPY ./conf/subsite.conf /etc/nginx/conf.d/default.conf

