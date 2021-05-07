
const { Sequelize } = require('sequelize');

class SequelizeManager{
    static instance = undefined;
    static getInstance(){
        if(this.instance == undefined){
            this.instance = new Sequelize('SwP1l1E2g2', 'SwP1l1E2g2', 'jH5505UucH', {
                host: 'remotemysql.com',
                dialect: 'mysql'
            });
        }
        return this.instance;
    }
}

module.exports = {
    SequelizeManager
}