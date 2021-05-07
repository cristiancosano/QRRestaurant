const { Model, DataTypes } = require('sequelize');
const { SequelizeManager } = require('./SequelizeManager')

const sequelize = SequelizeManager.getInstance();

class Rating extends Model {}
Rating.init({
  rating: {type: DataTypes.INTEGER, min: 1, max: 5}
}, { sequelize, modelName: 'rating', tableName: 'rating' });



module.exports = {
    Rating
}