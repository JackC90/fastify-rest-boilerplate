import Knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';

export function createConnection(config: Knex.Config) {
  return Knex({ ...config, ...knexSnakeCaseMappers() });
}
