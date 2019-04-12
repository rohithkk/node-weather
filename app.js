const request = require('request');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast');

geocode.getGeoCode('Los Angeles', (error, data) => {

    if(!error)
    {
        //console.log(data);
        forecast.forecast(data.lat, data.long, (error, weather) => {
            console.log(`Weather forecast for ${data.location}`);
            
            if(error)
                console.log(error);
            else
                console.log(weather);
        });
    }    
    else
        console.log(error);    
});


geocode.getGeoCode('Warangal', (error, data) => {

    if(!error)
    {
        //console.log(data);
        forecast.forecast(data.lat, data.long, (error, weather) => {
            
            console.log(`Weather forecast for ${data.location}`);
            
            if(error)
                console.log(error);
            else
                console.log(weather);
        });
    }    
    else
        console.log(error);    
});
