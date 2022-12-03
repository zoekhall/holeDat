import Sequelize from 'sequelize'

// Import sequelize object,
// Database connection pool managed by Sequelize.
import sequelize from './index'

// Define method takes two arguments
// 1st - name of table
// 2nd - columns inside the table
const User = sequelize.define('user', {
     user_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
     },
     name: { type: Sequelize.STRING, allowNull: false },
     email: { type: Sequelize.STRING, allowNull: false },
     myDate: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
     },
     createdAt: Sequelize.DATE,
     updatedAt: Sequelize.DATE,
})

User.create({name:'Jorge',email:'jorcar1986@gmail.com' })

sequelize.sync()

export default User;
