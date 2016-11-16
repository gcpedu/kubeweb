FROM node:4.4
EXPOSE 8080
COPY package.json .
COPY nodehello.js .
COPY nodehello.config.json .
COPY nodehello.jwt.json .
COPY json-template.js .
COPY page.jsont .
RUN npm install
CMD node nodehello.js

