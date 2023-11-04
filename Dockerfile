FROM node:14-alpile
WORKDIR /app/frontend

COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start" ]

