FROM node:18
WORKDIR /server
COPY package.json ./
RUN npm install
COPY . ./
CMD ["node", "server"]
EXPOSE 8000
