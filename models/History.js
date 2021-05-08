const { Model, DataTypes } = require('sequelize');
const { SequelizeManager } = require('./SequelizeManager')

const sequelize = SequelizeManager.getInstance();

class History extends Model {}
History.init({
    companions: DataTypes.INTEGER
}, { sequelize, modelName: 'history', tableName: 'history' });



module.exports = {
    History
}