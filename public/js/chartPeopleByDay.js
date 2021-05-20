(function(){
    function numberChart(labels, data){
        var popCanvas = document.getElementById("popChart");
        var backgroundColor = new Array();
        data.forEach(element => {
            backgroundColor.push('rgba(255, 99, 132, 0.6)')
        });
        var barChart = new Chart(popCanvas, {
        type: 'line',
        data: {
            labels,
            datasets: [{
            label: 'Número de personas por día',
            data,
            backgroundColor
            }]
        }
        });
    }
    
    var restaurantId = document.getElementById('restaurantId');
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/restaurants/"+restaurantId.value+"/chart-people-day");
    xhr.send();
    xhr.responseType = 'json';
    
    xhr.addEventListener('readystatechange', ()=>{
        let result = xhr.response;
        if(result != null){
            numberChart(result.date, result.people);
        }
    })
})()


