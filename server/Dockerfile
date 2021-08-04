FROM ubuntu:18.04
USER root

#software
RUN apt-get update \
    && apt-get install -y wget git-core apt-utils software-properties-common \
    && add-apt-repository ppa:jonathonf/ffmpeg-4 -y \
    && cd /root/ && wget https://deb.nodesource.com/setup_14.x && chmod +x ./setup_14.x && ./setup_14.x \
    && apt-get install nodejs build-essential ffmpeg -y


#repo
RUN mkdir /root/.ssh/
#server
COPY ./server/package*.json /root/server/
RUN cd /root/server && npm install
COPY ./server /root/server
COPY ./.env /root/server/
#client
COPY ./client/package*.json /root/client/
RUN cd /root/client && npm install
COPY ./client /root/client
RUN cd /root/client && npm run build

#ssh (remove after release)
RUN apt-get update \
    && apt-get install openssh-server -y
COPY ./authorized_keys /root/.ssh/

#server
WORKDIR /root/server/
CMD service ssh start; npm start