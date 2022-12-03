// make db server here
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

// importing .env file
dotenv.config();

// running on port 5555 if no env available
const endpoint = process.env.DB_ENDPOINT
const pw = process.env.DB_PW


const sequelize = new Sequelize('holes', 'postgres', pw, {
     host: endpoint,
     dialect: 'postgres',
     pool: {
          max: 9,
          min: 0,
          idle: 10000
     }
});

sequelize.authenticate().then(() => {
     console.log("Success!");
}).catch((err) => {
     console.log(err);
});

export default sequelize;
