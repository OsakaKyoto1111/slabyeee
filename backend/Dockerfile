FROM node:lts-alpine3.17

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 4040

CMD ["npm", "run", "dev"]
