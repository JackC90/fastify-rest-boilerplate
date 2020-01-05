import { createConnection } from './connect';
import { Model } from 'objection';

const env = process.env.NODE_ENV;
const configuration = require('../../knexfile')[env || 'development'];

let isDbInit = false;

const connection = createConnection(configuration);

Model.knex(connection);

export async function initializeDB(config?: any) {
  if (!isDbInit) {
    if (config) {
      const con = createConnection(config);
      Model.knex(con);
      connection.migrate.latest();
    } else {
      Model.knex(connection);
      connection.migrate.latest();
    }
    isDbInit = true;
  }
}
