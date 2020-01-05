import { FastifyInstance } from "fastify";
import fastifyCors from "fastify-cors";

export function configureCorsPlugin(fastify: FastifyInstance) {
  fastify.register(fastifyCors);
}