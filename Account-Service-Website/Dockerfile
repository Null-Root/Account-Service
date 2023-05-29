# Stage 1: Build the Angular app
FROM node:18.4.0-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Serve the built app
FROM node:18.4.0-alpine

WORKDIR /app

RUN npm install -g angular-http-server

COPY --from=builder /app/dist/Account-Service-Website .

EXPOSE 9001

CMD ["angular-http-server", "--path", ".", "-p", "9001", "--cors"]