# FROM node:14.10.1-alpine3.10 AS base
# ENV http_proxy "http://proxy.hcm.fpt.vn:80"
# ENV https_proxy "http://proxy.hcm.fpt.vn:80"
# ENV no_proxy "replicas-ipa.bigdata.local,ipa.bigdata.local,dev.bigdata.local"

# ARG REACT_APP_RECOM_URL_BE=$env.REACT_APP_RECOM_URL_BE
# ENV REACT_APP_RECOM_URL_BE "$REACT_APP_RECOM_URL_BE"
# # ENV REACT_APP_RECOM_URL_BE "https://recom.fpt.vn/api/v0.1/recommendation"

# WORKDIR /app
# # copy both 'package.json' and 'package-lock.json' (if available)
# COPY package*.json ./
# RUN npm install
# COPY . .

# FROM base AS code-dev
# RUN apk add --no-cache curl busybox-extras
# CMD ["npm", "start"]

# # Stage for run start
# FROM base AS builder
# RUN npm run build

# # Stage for run build
# FROM nginx:1.16.0-alpine as code-prod
# RUN rm  /usr/share/nginx/html/*
# COPY --from=builder /app/build /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
# EXPOSE 3000
# CMD ["nginx","-g","daemon off;"]


FROM repo.bigdata.local/nginx:1.16.0-alpine

LABEL MAINTAINER NAMNT96
ENV http_proxy=http://proxy.hcm.fpt.vn:80
ENV https_proxy=http://proxy.hcm.fpt.vn:80
ENV no_proxy "replicas-ipa.bigdata.local,ipa.bigdata.local,dev.bigdata.local"

RUN rm -rf /usr/share/nginx/html/* && \
    rm -rf /etc/nginx/conf.d/default.conf

COPY build /usr/share/nginx/html  
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD [ "nginx", "-g","daemon off;" ]
