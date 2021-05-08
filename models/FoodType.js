const { Model, DataTypes } = require('sequelize');
const { SequelizeManager } = require('./SequelizeManager')

const sequelize = SequelizeManager.getInstance();

class FoodType extends Model {}
FoodType.init({
  name: {type: DataTypes.STRING, unique: true}
}, { sequelize, modelName: 'foodType', tableName: 'foodType' });



module.exports = {
    FoodType
}