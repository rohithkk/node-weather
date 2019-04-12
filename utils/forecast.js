const request = require('request');

const darkSkyUrl = 'https://api.darksky.net/forecast/1722d6b45cf96bb2236dbc32386339e7/37.8267,-122.4233';
const darkSkyUrl2 = 'https://api.darksky.net/forecast/1722d6b45cf96bb2236dbc32386339e7/37.8267,-122.4233?lang=te&units=si';
const darkSkyUrl3 = 'https://api.darksky.net/forecast/1722d6b45cf96bb2236dbc32386339e7/';



//default request, with no options
/* request({url: darkSkyUrl}, function (error, response, body) {
    
    console.log('request with no options');

    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
   
    //response  body will be in text format. We need to convert it to JSON object
    let weatherResponse = JSON.parse(body);
    console.log(weatherResponse.hourly.summary);
    console.log(weatherResponse.currently.summary);
    console.log(weatherResponse.currently.temperature);
  }); */

//the "json" option sets body to JSON representation of value and adds Content-type: application/json header. 
//Additionally, parses the response body as JSON.
/* request({url: darkSkyUrl2, json:true}, function (error, response, body) {
    console.log('request with content type header');
    console.log('statusCode:', response && response.statusCode);
    //no need to parse the response. It was already parsed because of the json:true value
    console.log(body.hourly.summary);
    console.log(body.currently.summary);
    console.log(body.currently.temperature);
}); */




const forecast = (lat, long, callback) => {

    let dsUrl = darkSkyUrl3 + lat + ','+ long;
    
    request({url: dsUrl, json:true}, function (error, response) {

        if(error){
            callback(error, undefined);
            return;
        }

        if(!response || response.statusCode != 200)
        {

            //advantage of using the let keyword..
            // even though it was already defined above, we are redefining it here.
            let error = {
                status: response.statusCode,
                msg: response.body.error
            }
            callback(error, undefined );

            return;
        }

        let data = {
            summary: response.body.currently.summary,
            temp: response.body.currently.temperature
        }

        callback(undefined, data);
    });

}


module.exports = {

    forecast: forecast
}