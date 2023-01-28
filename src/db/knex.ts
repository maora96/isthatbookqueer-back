import knexLib from 'knex';

export const knex = knexLib({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'aroacedb',
  },
});
