FROM node:18-alpine3.14 

COPY . /app/
WORKDIR /app
RUN ["npm", "i"]

ENTRYPOINT [ "node", "index.js" ]