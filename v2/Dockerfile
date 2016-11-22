FROM node:6.9.1
EXPOSE 8080
RUN mkdir conf
RUN mkdir auth
COPY package.json .
COPY nodehello.js .
COPY conf/nodehello.config.json conf/nodehello.config.json
COPY auth/nodehello.jwt.json auth/nodehello.jwt.json
COPY json-template.js .
COPY page.jsont .
RUN npm install
CMD node nodehello.js

