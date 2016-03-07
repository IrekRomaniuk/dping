FROM node:argon

MAINTAINER Irek Romaniuk

# Create user dping in group dping
RUN groupadd -r dping \
    && useradd -m -r -g dping dping \
    && apt-get install inetutils-ping

WORKDIR /home/dping

# Install app dependencies
COPY  package.json  /home/dping/
RUN npm install
COPY websocket.js dping.js pingnet.js checknet.js server_nodeapi.js /home/dping/

EXPOSE 7777
CMD  npm start && echo "README at https://github.com/IrekRomaniuk/dping.git"