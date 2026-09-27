FROM node:26-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY .env ./
COPY .env.mysql ./
COPY src ./src
COPY migrations ./migrations
RUN npm run build



FROM node:26-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
COPY production/.env ./
COPY production/.env.mysql ./
RUN npm install --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/migrations ./migrations
EXPOSE 4000
