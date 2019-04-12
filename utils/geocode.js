const request = require('request');

const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const mapboxAccessToken = 'access_token=pk.eyJ1Ijoicm9oaXRoa29kYWthbmRsYSIsImEiOiJjanU3cnh0a3cwd3JjM3lrOWh6OWl6bWpxIn0.gV7l3dspZdOiDqj5X7w7DA&limit=1';


const getGeoCode = (address, callback) => {

    let mbUrl = mapboxUrl + encodeURIComponent (address) + '.json?' + mapboxAccessToken;

    request({url: mbUrl, json:true}, function (error, response, body) {
    
       // console.log('statusCode:', response && response.statusCode);
    
        if(error || response.statusCode !== 200){
            console.log('unable to get the coordinates for the given location');
            callback(error, undefined);
            return;
        }

        if(!body.features || body.features.length ==0){
            console.log('Unable to find given location');
            callback('unable to find location. try another search', undefined);
            return;
        }

        let searchResult = body.features[0];

        let location = {
            lat: searchResult.center[1],
            long: searchResult.center[0],
            location: searchResult.place_name 
        };

        if(callback)
            callback(undefined, location);

    });

    
};


module.exports = {
    getGeoCode: getGeoCode
}