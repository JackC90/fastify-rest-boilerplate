import Fastify from 'fastify';
import config from '../projectConfig';
import { configureAuthPlugin, configureCorsPlugin } from './plugins';
import { registerUsersRoutes } from './routes';

const { apiPrefix, apiVersion } = config;

export default function createServer(opts?: Fastify.ServerOptions) {
  let fastify = Fastify(opts);

  fastify.register(
    (instance, opts, next) => {
      configureCorsPlugin(fastify);
      //external plugins
      configureAuthPlugin(instance);

      //register application routes
      registerUsersRoutes(instance);
      next();
    },
    { prefix: `${apiPrefix}/${apiVersion}` }
  );

  return fastify;
}
