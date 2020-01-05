import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('users', function(
    table: Knex.CreateTableBuilder
  ) {
    table.increments().primary();
    table
      .string('username')
      .unique()
      .notNullable();
    table
      .string('email')
      .unique()
      .notNullable();
    table.string('password').notNullable();
    table
      .boolean('is_active')
      .notNullable()
      .defaultTo(true);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('users');
}
