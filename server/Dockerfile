FROM node:latest

COPY . /app
WORKDIR /app
RUN npm install
RUN sudo npm install -g pm2

CMD [ "npm", "start" ]