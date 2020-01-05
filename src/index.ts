import yargsParser from 'yargs-parser';
import createServer from './server';
import { initializeDB } from './database';

// Command line arguments
const argv = yargsParser(process.argv.slice(2));

const log =
  typeof argv.log === 'boolean'
    ? argv.log
    : JSON.stringify(process.env.NODE_ENV) === 'development';

const port: number =
  parseInt(JSON.stringify(process.env.PORT), 10) || 3000;
const start = async () => {
  const fastify = createServer({
    logger: log
  });

  try {
    await initializeDB();
    fastify.log.info(`Database connection established!`);
    await fastify.listen(port);
    fastify.log.info(`Server initialized on port ${port}`);
    console.log(fastify.printRoutes());
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
