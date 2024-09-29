FROM node:18.16.1-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:18.16.1-alpine AS runner

WORKDIR /app 
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist

EXPOSE 8080

CMD [ "node", "dist/main.js" ]
