import { FastifyInstance } from 'fastify';
import { validateUserData } from './handler';

export function registerUsersRoutes(fastify: FastifyInstance): void {
  fastify.register(
    (instance, opts, next) => {
      instance.get(`/verify`, async (request, reply) => {
        try {
          const { email, username } = request.query;
          reply.send({
            isValid: await validateUserData(email, username)
          });
        } catch (err) {
          reply.send(err);
        }
      });

      next();
    },
    { prefix: 'users' }
  );
}
