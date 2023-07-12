FROM node:lts-bullseye-slim AS build
ENV TZ America/Sao_Paulo

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./
RUN yarn
COPY . .
RUN yarn build


FROM node:lts-bullseye-slim
ENV TZ America/Sao_Paulo

ENV LD_LIBRARY_PATH=/opt/oracle/instantclient_21_8

# Prepare Ubuntu OS with Oracle Client
RUN apt-get update
RUN apt-get install wget unzip libaio1 -y
RUN mkdir -p /opt/oracle
WORKDIR /opt/oracle
RUN wget -O oracle_client.zip https://download.oracle.com/otn_software/linux/instantclient/218000/instantclient-basic-linux.x64-21.8.0.0.0dbru.zip
RUN unzip oracle_client.zip
RUN rm oracle_client.zip

# Prepare to puppeter
RUN apt-get update \
    && apt-get -y install gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Prepare NodeJs
WORKDIR /usr/src/app
COPY package*.json ./
COPY .env ./
RUN yarn

# Install pm2 to cluster execute
RUN npm install pm2 --location=global

# Create public folders
RUN mkdir -p ./public/image
RUN mkdir -p ./public/pdf

# Copy compiled files
COPY --from=build /usr/src/app/dist ./

COPY --from=build /usr/src/app/src/assets ./assets

EXPOSE 5000
EXPOSE 587

# Copy entry point file
COPY ecosystem.config.js ./

CMD [ "pm2-runtime", "ecosystem.config.js", "--env", "production" ]