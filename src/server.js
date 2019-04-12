//import express from 'express';
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../utils/geocode.js');
const forecast = require('../utils/forecast.js');

const port = process.env.PORT || 3000;

//current directory
console.log(__dirname);
console.log(path.join(__dirname, "/../templates/views"));
//current file name
//console.log(__filename);
//console.log(path.join(__dirname, '../static/'));


const app = express();

const staticDirPath = path.join(__dirname, '../static/');
const viewsPath = path.join(__dirname, "/../templates/views");
const partialsPath = path.join(__dirname, "/../templates/partials");

//register templating engine - in this case handlebar
app.set('views', viewsPath);
app.set('view engine', 'hbs');

//register partials path with hbs
hbs.registerPartials(partialsPath);


//this command will make all the files from the static directory avaialble from the client side
app.use(express.static(staticDirPath));

//we have a file called index.html in the static directory. Since the static files are associated first
//the below route is never initialized. If we call loalhost:3000, request goes to index.html.
// if we change the order to have this route first and then the static directory, then this route is picked up
// app.get("", (req, res)=>{
//     res.send('Hello from Node-Expressjs');
// });

app.get("", (req, res)=>{
    res.render('index', {
        title: 'Index',
        author: 'Rohith Kodakandla'
    });
});

//about.html and help.html are static files
//since we registered the static directory above, we can directly access those files by using hte following URLs. No need to register routes.
//localhost:8080/about.html, localhost:8080/help.html, 

app.get("/home", (req, res) => {
   res.render('home',{
       title: 'Home',
       author: 'Rohith Kodakandla'
   });
});

app.get("/help", (req, res) => {
    res.render('help',{
        title: 'Help',
        author: 'Rohith Kodakandla'
    });
 });

 app.get("/about", (req, res) => {
    res.render('about',{
        title: 'About',
        author: 'Rohith Kodakandla'
    });
 });

app.get("/weather", (req, res) => {

    if(!req.query || !req.query.address){
        return res.send({
            error: "address is required"
        });
    }

    let address = req.query.address;

    geocode.getGeoCode(address, (error, {lat, long, location} = {} ) => {

        if(!error)
        {
            forecast.forecast(lat, long, (error, weather) => {
                
                console.log(`Weather forecast for ${location}`);
                
                if(error)
                {
                    return res.send({
                        error: "Failed to find the weather for the given location"
                    });
                }    
                else
                {
                    res.send({
        
                        forecast: weather.summary,
                        temperature: weather.temp,
                        location: location
                    });
                } 
            });
        }    
        else
         {
            return res.send({
                //shorthand syntax..
                error
            });

         }   
    });

});

app.get("/products", (req, res) => {

    res.send({
        products: []
    })

});

app.get("/help/*", (req, res) => {
    //res.send("help can be found at http://localhost:3000/help");
    res.render('error', {
        title: 'Help Page Not Found',
        message: 'The help page your are looking for is not found'
    })
});



app.get("*", (req, res) => {
    //res.send("Page not found");
    res.render('error', {
        title: 'Page Not Found',
        message: 'The page your are looking for is not found'
    })
});


app.listen(port, () => {
    console.log(`started server on port ${port}`);
})