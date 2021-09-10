
"use strict"
const axios = require('axios');
require('dotenv').config();



const gettingWheather = async (req, res) => {
    const ForeCast = require('../models/forecast.model');
    const WHEATHER_API_KEY = process.env.WHEATHER_API_KEY;
    let cityName = req.query.city_name;
    const witherBitUrl = 'http://api.weatherbit.io/v2.0/forecast/daily'
    try {

        const witherResponse = await axios.get(`${witherBitUrl}?key=${WHEATHER_API_KEY}&city=${cityName}`)

        console.log(witherResponse);




        let forecasts = witherResponse.data.data.map(item => {

            return new ForeCast(item);

        })

        res.send(forecasts)

        console.log(forecasts)


    }
    catch {
        res.status(500).send('we dont have this city');
    };

}
module.exports = gettingWheather;