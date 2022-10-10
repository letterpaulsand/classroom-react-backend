FROM node:14.20.0
WORKDIR /app
COPY . .
RUN npm install
CMD [ "npm", "start" ]