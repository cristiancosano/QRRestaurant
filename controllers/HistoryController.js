const historyModel = require('../models/History').History

class HistoryController{

    static async getNumPeople(req, res, next){
        let params = req.params;
        let history = await historyModel.findAll({where: {restaurantId: params.id}})

        var createdAt = new Array();
        var people = new Array();

        var groupBy = function (history, prop) {
            return history.reduce(function(groups, item) {
                var val = item[prop];
                groups[val] = groups[val] || {createdAt: item.createdAt.toLocaleDateString('es-ES', {month: '2-digit', day:'2-digit', year: 'numeric'}), people: 0};
                groups[val].people += item.companions + 1;
                return groups;
            }, {});
        }
        let numPeople = groupBy(history, 'createdAt');

        for(let element in numPeople){
            createdAt.push(numPeople[element].createdAt);
            people.push(numPeople[element].people);
        }

        res.send({createdAt, people});
    }

    static async getPeopleHour(req, res, next) {

        let params = req.params;
        let history = await historyModel.findAll({where: {restaurantId: params.id}})

        var hour = new Array();
        var people = new Array();
        
        var groupBy = function (history, prop) {
            return history.reduce(function(groups, item) {
                var val = item.createdAt.toLocaleTimeString('es-ES', {month: '2-digit', day:'2-digit', year: 'numeric', hour:'numeric'})
                groups[val] = groups[val] || {hour: item.createdAt.toLocaleTimeString('es-ES', {month:'2-digit', day: '2-digit', hour:'numeric', minute: 'numeric'}), people: 0};
                groups[val].people += item.companions + 1;
                return groups;
            }, {});
        }
        let numPeople = groupBy(history, 'createdAt');

        for(let element in numPeople){
            hour.push(numPeople[element].hour);
            people.push(numPeople[element].people);
        }
        res.send({hour, people});
    }
}

module.exports = {HistoryController}