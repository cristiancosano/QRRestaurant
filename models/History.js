const { Model, DataTypes, QueryTypes } = require('sequelize');
const { SequelizeManager } = require('./SequelizeManager')

const sequelize = SequelizeManager.getInstance();

class History extends Model {

    static getPeopleByDay(restaurantId){
        return sequelize.query
        (
            `SELECT (count(id)+SUM(companions)) AS people, ANY_VALUE(createdAt) as createdAt 
            FROM history WHERE restaurantId = ${restaurantId} GROUP BY EXTRACT(DAY FROM createdAt),
            EXTRACT(MONTH FROM createdAt), EXTRACT(YEAR FROM createdAt) LIMIT 30`,
            
            {type: QueryTypes.SELECT}
        );
    }

    static getPeopleByHour(restaurantId){
        return sequelize.query
        (
            `SELECT (count(id)+SUM(companions)) AS people, ANY_VALUE(createdAt) 
            as createdAt from history WHERE restaurantId = ${restaurantId} GROUP BY EXTRACT(HOUR FROM createdAt),
            EXTRACT(DAY FROM createdAt), EXTRACT(MONTH FROM createdAt), EXTRACT(YEAR FROM createdAt) LIMIT 30`,
            
            {type: QueryTypes.SELECT}
        );
    }

    static async getAverageStay(restaurantId){
        let query= await sequelize.query
        (
            `select sec_to_time(AVG(subtime(time(updatedAt), time(createdAt)))) 
            as promedio_restaurante from history WHERE history.restaurantId = ${restaurantId}`,
            
            {type: QueryTypes.SELECT}
        );

        return query[0].promedio_restaurante;
    }

}
History.init({
    companions: DataTypes.INTEGER
}, { sequelize, modelName: 'history', tableName: 'history' });



module.exports = {
    History
}