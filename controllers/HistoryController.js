const historyModel = require('../models/History').History

class HistoryController{

    // SELECT count(id), SUM(companions), (count(id)+SUM(companions)) AS people, ANY_VALUE(createdAt) as createdAt from history WHERE restaurantId = 1 GROUP BY EXTRACT(DAY FROM createdAt), EXTRACT(MONTH FROM createdAt), EXTRACT(YEAR FROM createdAt)

    // SELECT count(id), SUM(companions), (count(id)+SUM(companions)) AS people, DATE_FORMAT(ANY_VALUE(createdAt), "%Y-%m-%d %H:00:00") as createdAt from history WHERE restaurantId = 1 GROUP BY EXTRACT(HOUR FROM createdAt), EXTRACT(DAY FROM createdAt), EXTRACT(MONTH FROM createdAt), EXTRACT(YEAR FROM createdAt)
    
    static async getPeopleByDay(req, res, next){
        let data = await historyModel.getPeopleByDay(req.params.id);
        let people = new Array();
        let date = new Array();
        for(let i in data){
            people.push(data[i].people);
            date.push(data[i].createdAt.toLocaleDateString('es-ES', {month: '2-digit', day: '2-digit', year: 'numeric'}));
        }
        res.send({people, date})
    }

    static async getPeopleByHour(req, res, next){
        let data = await historyModel.getPeopleByHour(req.params.id);
        let people = new Array();
        let date = new Array();
        for(let i in data){
            people.push(data[i].people);
            let hour = new Date(data[i].createdAt);
            hour.setMinutes(0, 0);

        
            date.push(hour.toLocaleTimeString('es-ES', {month: '2-digit', day: '2-digit', year: 'numeric', hour: 'numeric', minute:'numeric'}));
        }
        res.send({people, date})
    }


    // static async getNumPeople(req, res, next){
    //     let params = req.params;
    //     let history = await historyModel.findAll({where: {restaurantId: params.id}})

    //     var createdAt = new Array();
    //     var people = new Array();

    //     var groupBy = function (history, prop) {
    //         return history.reduce(function(groups, item) {
    //             var val = item[prop];
    //             groups[val] = groups[val] || {createdAt: item.createdAt.toLocaleDateString('es-ES', {month: '2-digit', day:'2-digit', year: 'numeric'}), people: 0};
    //             groups[val].people += item.companions + 1;
    //             return groups;
    //         }, {});
    //     }
    //     let numPeople = groupBy(history, 'createdAt');

    //     for(let element in numPeople){
    //         createdAt.push(numPeople[element].createdAt);
    //         people.push(numPeople[element].people);
    //     }

    //     res.send({createdAt, people});
    // }

    // static async getPeopleHour(req, res, next) {

    //     let params = req.params;
    //     let history = await historyModel.findAll({where: {restaurantId: params.id}})

    //     var hour = new Array();
    //     var people = new Array();
        
    //     var groupBy = function (history, prop) {
    //         return history.reduce(function(groups, item) {
    //             var val = item.createdAt.toLocaleTimeString('es-ES', {month: '2-digit', day:'2-digit', year: 'numeric', hour:'numeric'})
    //             groups[val] = groups[val] || {hour: item.createdAt.toLocaleTimeString('es-ES', {month:'2-digit', day: '2-digit', hour:'numeric', minute: 'numeric'}), people: 0};
    //             groups[val].people += item.companions + 1;
    //             return groups;
    //         }, {});
    //     }
    //     let numPeople = groupBy(history, 'createdAt');

    //     for(let element in numPeople){
    //         hour.push(numPeople[element].hour);
    //         people.push(numPeople[element].people);
    //     }
    //     res.send({hour, people});
    // }
}

module.exports = {HistoryController}