import { createServer } from "./app";
import { env } from "./config/env";
import { logger } from "./lib/logger";

const server = createServer();

server.listen(env.port, () => {
  logger.info(`Api server is running on port: ${env.port}`);
});
