FROM node:latest

COPY . /server
WORKDIR /server
RUN npm install
RUN sudo npm install -g pm2

CMD [ "npm", "start" ]