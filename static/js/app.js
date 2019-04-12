console.log('in app.js');

function getWeatherData(){

    const errorElement = document.querySelector('#error');
    const weatherElement = document.querySelector('#weather');
    const forecastElement = document.querySelector('#forecast');
    const tempElement = document.querySelector('#temperature');
    const locationElement = document.querySelector('#location');

    let address = document.getElementById('address').value;
    fetch(`/weather?address=${address}`).then((response)=> {

        if(response.status == 200){
            response.json().then((data) =>{
    
                if(data.error)
                {
                    console.log(data.error);
                    errorElement.style.display = 'block';
                    weatherElement.style.display = 'none';
                    errorElement.innerHTML=data.error;
                }    
                else
                {
                    console.log(data); 

                    console.log(data.error);
                    weatherElement.style.display = 'block';
                    errorElement.style.display = 'none';
                    forecastElement.innerHTML=data.forecast;
                    tempElement.innerHTML = data.temperature;
                    locationElement.innerHTML = data.location;
                }   
            });    
        }else{
            console.log(error);
            errorElement.style.display = 'block';
            weatherElement.style.display = 'none';
            errorElement.innerHTML=data.error;
        }
        
    }).catch( (r) => {
        console.log(r);
    })

}
