FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# RUN npm run dev

EXPOSE 8080

CMD ["npm","run", "dev"]

