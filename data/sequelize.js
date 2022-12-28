const path = require('path');
const { Sequelize } = require('sequelize');

console.log(path.join(__dirname, '../db/data.db'));

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../db/data.db')
});

sequelize.authenticate().then(res => {
    console.log('+++++++++++++');
    console.log(res);
})
module.exports.sequelize = sequelize;