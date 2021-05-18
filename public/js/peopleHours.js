(function(){
    function numberChart(labels, data){
        var popCanvas = document.getElementById("peopleHour");
        var backgroundColor = new Array();
        data.forEach(() => {
            backgroundColor.push('rgba(54, 162, 235, 0.6)')
        });
        console.log(data)
        console.log(labels)
        var barChart = new Chart(popCanvas, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                label: 'Número de personas por hora',
                data,
                backgroundColor,
                showLine: true,
                fill: false
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
        if(result != null){
            numberChart(result.hour, result.people);
        }
    })    
})()



