// make db server here
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('codeforgeek', 'postgres', 'shahid', {
     host: 'localhost',
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
