#Build stage
FROM node:12 as build

WORKDIR /usr/src/

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

#Production stage
FROM node:12 as prod

WORKDIR /usr/src/

COPY package*.json ./

RUN npm ci --only=production

COPY --from=build /usr/src/dist ./dist

CMD ["npm", "start"]

