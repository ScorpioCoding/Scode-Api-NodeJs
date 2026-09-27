# SCODE API SERVER CREATED BY SCORPIOCODING

### Insatallation

- Run `npm install` to install dependencies.

### Dependencies :

- NodeJs
- Express
- Typescript
- Mysql
- Bcrypt
- Cors
- Dotenv
- Pino
- Jsonwebtoken

### Scripts - npm run ...

- "dev": "tsx watch src/server.ts",
- "build": "tsc",
- "start": "node dist/server.js",
- "migrate:dev": "tsx src/database/migrate.ts",
- "migrate:prod": "node dist/database/migrate.js",
- "docker:up": "docker compose up -d --build",
- "docker:down": "docker compose down",
- "docker:build": "docker build -t api ."
- "docker:save": "docker save -o api.tar api"

### API Testing

- Vscode extension : "REST Client" from Huachao Mao
- [rest-client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

### Migrations

- Custom migration script
- Migration files must be of type ".sql" and have ".up" in the name

### Development Procedures

- Change .env file
  - NODE_ENV=development
- Change .env.mysql file
  - MYSQL_HOST=localhost
- Run script docker:up
- Run script migrate:dev
- Run script dev

### Production Procedures

- Change .env file
  - NODE_ENV=production
- Change .env.mysql file
  - MYSQL_HOST=db
- Run script docker:build
- Run script docker:save
- Transfer image and docker-compose.yml file to docker server online
- Run the docker-compose file

see = [transfer-docker-image-from-pc-to-server](https://www.scorpiocoding.com/blog/slug/transfer-docker-image-from-pc-to-server) for further information.
