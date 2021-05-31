FROM node:16
USER node
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# Create app directory
WORKDIR /usr/src/app


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

CMD [ "npm", "run", "watch"]

# docker build -t haxvolleyball .
# docker run -p 8100:8080 -v /mnt/c/Bartek/Informatyka/projekty/haxvolleyball/:/usr/src/app haxvolleyball
# docker run -p 8100:8080 -v ~/Informatyka/haxvolleyball/:/usr/src/app haxvolleyball