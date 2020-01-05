import {
  FastifyInstance,
  FastifyRequest,
  FastifyReply
} from 'fastify';
import { ServerResponse } from 'http';
import fastifyJWT from 'fastify-jwt';
import bcrypt from 'bcryptjs';
import { User } from '../models/users';
import { raw } from 'objection';

export function configureAuthPlugin(fastify: FastifyInstance) {
  fastify.register(fastifyJWT, {
    secret: process.env.APP_SECRET || ''
  });

  fastify.post('/signup', async (request, reply) => {
    try {
      const { password } = request.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.query().insert({
        ...request.body,
        password: hashedPassword
      });
      if (!user) {
        reply.send(new Error('Error signing up!'));
      }
      const token = fastify.jwt.sign({ userId: user.id });
      reply.send({ token });
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.post('/login', async (request, reply) => {
    try {
      const { username, password } = request.body;
      const user = await User.query().findOne(
        raw(`username = '${username}' OR email = '${username}'`)
      );
      if (!user) {
        reply.send(new Error('No such user!'));
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        reply.send(new Error('Password is incorrect!'));
      }
      const token = fastify.jwt.sign({ userId: user.id });
      reply.send({ token });
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.post('/auth/issueToken', (request, reply) => {
    const token = fastify.jwt.sign({ userId: request.body.userId });
    reply.send({ token });
  });

  fastify.post('/auth/checkToken', (request, reply) => {
    const verified = fastify.jwt.verify(request.body.token);
    reply.send({ verified });
  });

  fastify.decorate(
    'authenticate',
    async (
      request: FastifyRequest,
      reply: FastifyReply<ServerResponse>
    ) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );
}
