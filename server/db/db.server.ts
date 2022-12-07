// make db server here
import { Sequelize } from 'sequelize';

// running on port 5555 if no env available
const { DB_HOST = 'localhost', DB_NAME = 'holes', DB_PW = '', DB_USER = 'postgres' } = process.env;

const db = new Sequelize(DB_NAME, DB_USER, DB_PW, {
  host: DB_HOST,
  dialect: 'postgres',
  pool: {
    max: 9,
    min: 0,
    idle: 10000,
  },
  logging: false,
});

db
  .authenticate()
  .then(() => {
    console.log('Success!');
  })
  .catch((err) => {
    console.log(err);
  });

  

export default db;
