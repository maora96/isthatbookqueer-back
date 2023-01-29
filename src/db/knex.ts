import knexLib from 'knex';

export const knex = knexLib({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  // connection: {
  //   connectString:process.env.DATABASE_URL,
  //   // host: 'localhost',
  //   // port: 5432,
  //   // user: 'postgres',
  //   // password: 'postgres',
  //   // database: 'aroacedb',
  // },
});
