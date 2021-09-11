
"use strict"
const axios = require('axios');
require('dotenv').config();
const Cache = require('../helper/cache.helper');
const ForeCast = require('../models/forecast.model');
let cacheObj = new Cache();

console.log('================');
console.log('Cache instance created');
console.log('================');

const gettingWheather = async (req, res) => {

    const WHEATHER_API_KEY = process.env.WHEATHER_API_KEY;
    let cityName = req.query.city_name;
    const witherBitUrl = 'http://api.weatherbit.io/v2.0/forecast/daily'


    const InMilSec = 66676;
    const passed = (Date.now() - cacheObj.timeStamp) > InMilSec;
    if (passed) {
      console.log('================');
      console.log('Cache Reset');
      console.log('================');
      cacheObj = new Cache();
    }

    const checkData= cacheObj.foreCast.find(location => location.cityName);
   
    if (checkData) {
      res.send(checkData);
    } else {
      console.log('No Cache data found');
      console.log('================');

  






    try {

        const witherResponse = await axios.get(`${witherBitUrl}?key=${WHEATHER_API_KEY}&city=${cityName}`)

        console.log(witherResponse);

        if (cityName) {
           
        let forecasts = witherResponse.data.data.map(item => {

            return new ForeCast(item);

        })

            console.log('================');
            console.log('Save data into cache');
            console.log('================');
      
            cacheObj.foreCast.push({
              "cityName":cityName,
              "forecasts": forecasts
            });
            console.log('================');
            console.log(cacheObj);
            console.log('================');
            res.send(forecasts);
          } else {
            res.send('no data found :disappointed:')
          }





        console.log(forecasts)


    }
    catch {
        res.status(500).send('we dont have this city');
    };

}
}
module.exports = gettingWheather;