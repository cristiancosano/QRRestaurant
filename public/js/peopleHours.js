(function(){
    function numberChart(labels, data){
        var popCanvas = document.getElementById("peopleHour");
        var backgroundColor = new Array();
        data.forEach(element => {
            backgroundColor.push('rgba(54, 162, 235, 0.6)')
        });
        var barChart = new Chart(popCanvas, {
        type: 'line',
        data: {
            labels,
            datasets: [{
            label: 'Número de personas por hora',
            data,
            backgroundColor
            }]
        }
        });
    }
    
    var restaurantId = document.getElementById('restaurantId');
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/restaurants/"+restaurantId.value+"/chart-people-hour");
    xhr.send();
    xhr.responseType = 'json';
    
    xhr.addEventListener('readystatechange', ()=>{
        let result = xhr.response;
        console.log(result)
        if(result != null){
            numberChart(result.hour, result.people);
        }
    })    
})()



