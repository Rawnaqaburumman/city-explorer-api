"use strict"
const axios = require('axios');
require('dotenv').config();


const gettingMovies = async (req, res) => {
    const Movie = require('../models/movies.model');
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

}
module.exports = gettingMovies;