import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('sqlite::memory:');

module.exports.sequelize = sequelize;