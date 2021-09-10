"use strict"

require('dotenv').config();
const express = require('express');
const server = express();
const weatherData = require('./data/weather')
const PORT = process.env.PORT
const cors = require('cors');
const axios = require('axios');
server.use(cors());

server.get('/', (req, res) => {
    res.send('home route')
})

server.get('/dataTest', (req, res) => {
    res.send(weatherData)
})

class ForeCast {
    constructor(item) {


        this.date = item.valid_date;

        this.description = `Low of ${item.low_temp}, high of ${item.max_temp} with ${item.weather.description}`;

        this.latatide = `the latitude is ${item.lat}`
        this.longitude = `the longitude is ${item.lon}`
    }
}





class Movie {
    constructor(item) {
        this.title = item.original_title;
        this.overview = item.overview;
        this.averageVotes = item.vote_average;
        this.totalVotes = item.vote_count;
        this.popularity = item.popularity;
        this.releasedOn = item.release_date;
        if (item.poster_path) {
            this.imageUrl = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
        }
    }

}






const WHEATHER_API_KE = process.env.WHEATHER_API_KEY;

server.get('/weather', async (req, res) => {
    let cityName = req.query.city_name;
    const witherBitUrl = 'http://api.weatherbit.io/v2.0/forecast/daily'

    const witherResponse = await axios.get(`${witherBitUrl}?city=${cityName}&key=${WHEATHER_API_KE}`)

    console.log(witherResponse);

    try {



        let forecasts = witherResponse.data.data.map(item => {

            return new ForeCast(item);

        })

        res.send(forecasts)




    }
    catch {
        res.status(500).send('we dont have this city');
    };

});






server.get('/movie', async (req, res) => {

    const moviesKey = process.env.MOVIE_API_KEY;
    let movieCityName = req.query.city_name;

    const movieBackUrl = 'https://api.themoviedb.org/3/search/movie?'
    const movieResult = await axios.get(`${movieBackUrl}?&api_key=${moviesKey}&query=${movieCityName}`)
    console.log(movieResult);
    try {
        let moviesArray = movieResult.data.results.map(item => {
            return new Movie(item);
        })
        res.send(moviesArray);
    }
    catch {
        res.status(500).send('we dont have this city');
    };

})

server.get('*', (req, res) => {
    res.status(404).send('Something went wrong');
});



server.listen(PORT)

