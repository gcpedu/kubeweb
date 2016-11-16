FROM node:4.4
EXPOSE 8080
COPY package.json .
COPY nodehello.js .
RUN mkdir auth
RUN mkdir conf
COPY conf/nodehello.config.json conf
COPY auth/nodehello.jwt.json auth
COPY json-template.js .
COPY page.jsont .
RUN npm install
CMD node nodehello.js

